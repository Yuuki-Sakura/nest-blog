import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ArticleEntity } from '@article/article.entity';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '@shared/entity/base.entity';
import { Role } from '@role/role.entity';
import { Exclude } from 'class-transformer';

export enum EGender {
  Secrecy, //保密
  Male, //男性
  Female, //女性
}

export enum EUserStatus {
  active,
  banned,
}

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ length: 500, comment: '用户名', unique: true })
  username: string;

  @IsEmail()
  @Column({ length: 50, comment: '邮箱', unique: true })
  email: string;

  @Column({ comment: '手机号', nullable: true, unique: true })
  phone: string;

  @Column({ length: 256, comment: '密码' })
  @Exclude()
  password: string;

  @Column({ length: 500, nullable: true, default: null, comment: '头像' })
  avatar: string;

  @Column('simple-enum', {
    enum: EGender,
    default: EGender.Secrecy,
    comment: '性别',
  })
  gender: number;

  @Column('timestamp', { comment: '生日', default: null })
  birthday: Date;

  @Column('simple-enum', {
    enum: EUserStatus,
    default: EUserStatus.active,
    comment: '用户状态',
  })
  status: number;

  @Column('timestamp', { comment: '登陆时间', nullable: true })
  loginDate: Date;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
