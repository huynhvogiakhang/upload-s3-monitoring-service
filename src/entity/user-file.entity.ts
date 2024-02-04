import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TransferStatus {
  PENDING = 'PENDING',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

@Entity('user_file')
export class UserFile {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique ID of the file.',
  })
  id: number;

  @Column({ length: 500 })
  @ApiProperty({ example: 'file', description: 'The field name of the file.' })
  fieldname: string;

  @Column({ length: 500 })
  @ApiProperty({
    example: 'myFile.txt',
    description: 'The original name of the file.',
  })
  originalname: string;

  @Column({ length: 500 })
  @ApiProperty({ example: '7bit', description: 'The encoding of the file.' })
  encoding: string;

  @Column({ length: 500 })
  @ApiProperty({
    example: 'text/plain',
    description: 'The MIME type of the file.',
  })
  mimetype: string;

  @Column('int')
  @ApiProperty({
    example: 12345,
    description: 'The size of the file in bytes.',
  })
  size: number;

  @Column({
    type: 'enum',
    enum: TransferStatus,
    default: TransferStatus.PENDING,
  })
  @ApiProperty({
    example: TransferStatus.PENDING,
    description: 'The transfer status of the file.',
    enum: TransferStatus,
  })
  transferStatus: TransferStatus;

  @ManyToOne(() => User, (user) => user.files)
  user: User;
}
