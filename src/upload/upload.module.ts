import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { S3Module } from 'src/core/aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFile } from 'src/entity/user-file.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [S3Module, TypeOrmModule.forFeature([UserFile, User])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
