import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TMethod } from '@http-log/http-log.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  OPTIONS,
  HEAD,
}
registerEnumType(HttpMethod, {
  name: 'HttpMethod',
});

@Entity('permission')
@ObjectType()
export class Permission extends BaseEntity {
  @Field()
  @ApiProperty()
  @Column({ comment: '权限名称', default: '' })
  name: string;

  @Field()
  @ApiProperty()
  @Column({ comment: '资源', unique: true })
  resource: string;

  @Field({ nullable: true })
  @Column({ comment: '路由', nullable: true })
  route: string;

  @Field(() => HttpMethod, { nullable: true })
  @Column({ comment: '方法', nullable: true })
  method: TMethod;
}
