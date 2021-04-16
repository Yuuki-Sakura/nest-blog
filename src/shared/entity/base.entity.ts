import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from '@shared/decorator/timestamp.decorator';

@Entity()
export class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_time',
  })
  @Timestamp()
  createTime: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
    name: 'update_time',
  })
  @Timestamp()
  updateTime: Date;
}
