import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsIP } from 'class-validator';
import { Timestamp } from '@shared/decorator/timestamp.decorator';
import { HttpStatus } from '@nestjs/common';

export type TMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

@Entity('http_log')
export class HttpLogEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ comment: '请求方法' })
  method: TMethod;

  @Column({ comment: '请求URL' })
  url: string;

  @Column('simple-enum', { enum: HttpStatus, comment: '响应状态码' })
  status: HttpStatus;

  @Column({ name: 'http_version', comment: 'HTTP协议版本' })
  httpVersion: string;

  @Column({ name: 'user_agent' })
  userAgent: string;

  @Column()
  host: string;

  @Column({ comment: '客户端IP' })
  @IsIP()
  ip: string;

  @Timestamp({
    name: 'req_time',
    comment: '请求时间',
  })
  requestTime: Date;

  @Column('simple-json', { comment: '请求头' })
  headers: object;
}
