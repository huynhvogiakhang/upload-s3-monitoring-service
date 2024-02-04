import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserFile } from './user-file.entity';
import { MAX_FILE_SIZE } from 'src/core/constant/file-limit.constant';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique ID of the user.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: number;

  @Column({ length: 500 })
  @ApiProperty({ description: 'The username of the user.', example: 'khang' })
  username: string;

  @Column({ type: 'int', default: MAX_FILE_SIZE })
  @ApiProperty({
    description: 'The quota of the user.',
    example: MAX_FILE_SIZE,
  })
  quota: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'The current usage of the user.', example: 0 })
  currentUsage: number;

  @OneToMany(() => UserFile, (userfile) => userfile.user)
  files: File[];
}
