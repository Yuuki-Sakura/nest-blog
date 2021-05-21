import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsIP } from 'class-validator';
import { Timestamp } from '@shared/decorator/timestamp.decorator';
import { HttpStatus } from '@nestjs/common';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export type TMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

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
registerEnumType(HttpStatus, {
  name: 'HttpStatus',
});

@Entity('http_log')
@ObjectType()
export class HttpLog {
  @PrimaryGeneratedColumn()
  @Field()
  id?: string;

  @Field(() => HttpMethod)
  @Column({ comment: '请求方法' })
  method: TMethod;

  @Field()
  @Column({ comment: '请求URL' })
  url: string;

  @Field(() => HttpStatus)
  @Column('simple-enum', { enum: HttpStatus, comment: '响应状态码' })
  status: HttpStatus;

  @Field()
  @Column({ name: 'http_version', comment: 'HTTP协议版本' })
  httpVersion: string;

  @Field()
  @Column({ name: 'user_agent' })
  userAgent: string;

  @Field()
  @Column()
  host: string;

  @Field()
  @Column({ comment: '客户端IP' })
  @IsIP()
  ip: string;

  @Field()
  @Timestamp({
    name: 'req_time',
    comment: '请求时间',
  })
  requestTime: Date;

  @Column('simple-json', { comment: '请求头' })
  headers: object;
}
