import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Article } from '@article/article.entity';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '@shared/entity/base.entity';
import { Role } from '@role/role.entity';
import { Exclude } from 'class-transformer';
import { Timestamp } from '@shared/decorator/timestamp.decorator';
import { Comment } from '@comment/comment.entity';
import { IMGroup } from '@im/entities/group.entity';
import { IMAnnouncement } from '@im/entities/announcement.entity';
import { IMFriend } from '@im/entities/friend.entity';
import { IMRequest } from '@im/entities/request.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum EGender {
  Secrecy, //保密
  Male, //男性
  Female, //女性
}

export enum EUserStatus {
  Active,
  Banned,
}

registerEnumType(EGender, {
  name: 'EGender',
});
registerEnumType(EUserStatus, {
  name: 'EUserStatus',
});

@Entity('user')
@ObjectType()
export class UserEntity extends BaseEntity {
  @Field()
  @Column({ length: 500, comment: '用户名', unique: true })
  username: string;

  @Field()
  @IsEmail()
  @Column({ length: 50, comment: '邮箱', unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ comment: '手机号', nullable: true, unique: true })
  phone: string;

  @Column({ length: 256, comment: '密码' })
  @Exclude()
  password: string;

  @Field({ nullable: true })
  @Column({ length: 500, nullable: true, default: null, comment: '头像' })
  avatar: string;

  @Field(() => EGender)
  @Column('simple-enum', {
    enum: EGender,
    default: EGender.Secrecy,
    comment: '性别',
  })
  gender: EGender;

  @Field({ nullable: true })
  @Column('timestamp', { comment: '生日', default: null })
  birthday: Date;

  @Field(() => EUserStatus)
  @Column('simple-enum', {
    enum: EUserStatus,
    default: EUserStatus.Active,
    comment: '用户状态',
  })
  status: EUserStatus;

  @Field({ nullable: true })
  @Timestamp({
    name: 'login_at',
    comment: '登陆时间',
    nullable: true,
  })
  loginAt: Date;

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @Field(() => [IMGroup])
  @OneToMany(() => IMGroup, (group) => group.owner)
  imOwnGroups: IMGroup[];

  @Field(() => [IMGroup])
  @ManyToMany(() => IMGroup, (group) => group.members)
  @JoinTable()
  imJoinGroups: IMGroup[];

  @Field(() => [IMAnnouncement])
  @OneToMany(() => IMAnnouncement, (announcement) => announcement.author)
  announcements: IMAnnouncement[];

  @Field(() => [IMFriend])
  @OneToMany(() => IMFriend, (friend) => friend.user)
  friends: IMFriend[];

  @Field(() => [IMRequest])
  @OneToMany(() => IMRequest, (request) => request.from)
  requests: IMRequest[];

  @Field(() => [IMRequest])
  @OneToMany(() => IMRequest, (request) => request.toUser)
  addRequests: IMRequest[];
}
