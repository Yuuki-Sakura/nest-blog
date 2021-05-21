import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@permission/permission.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@user/user.entity';

@Entity('role')
@ObjectType()
export class Role extends BaseEntity {
  @Field()
  @ApiProperty()
  @Column({ comment: '角色名称', unique: true })
  name: string;

  @Field(() => [Permission])
  @ApiProperty()
  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.roles)
  @JoinTable()
  users: UserEntity[];
}
