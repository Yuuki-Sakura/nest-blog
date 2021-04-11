import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('permission')
export class Permission extends BaseEntity {
  @ApiProperty()
  @Column({ comment: '权限名称' })
  name: string;

  @ApiProperty()
  @Column({ comment: '资源', unique: true })
  resources: string;
}