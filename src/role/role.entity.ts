import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@permission/permission.entity';

@Entity('role')
export class Role extends BaseEntity {
  @ApiProperty()
  @Column({ comment: '角色名称' })
  name: string;

  @ApiProperty()
  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
