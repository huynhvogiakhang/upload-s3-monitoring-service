import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/core/aws/aws.service';
import { UserFile } from 'src/entity/user-file.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserFile)
    private usersFileRepository: Repository<UserFile>,
    private configService: ConfigService,
  ) {}

  async uploadFile(file, user: any): Promise<UserFile> {
    console.log(user);
    const userData = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    if (userData.currentUsage + file.size > userData.quota) {
      throw new BadRequestException('Exceeds quota');
    }
    const userFile = await this.usersFileRepository.save({
      url: file.url,
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
    });
    userData.currentUsage += file.size;
    await this.usersRepository.save(userData);

    const uploadResult = await this.s3Service.uploadFile(
      file.buffer,
      this.configService.get<string>('S3_BUCKET_NAME'),
      file.originalname,
    );

    return userFile;
  }
}
