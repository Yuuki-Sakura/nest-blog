import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Article } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/user.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CommentStatus {
  Review = 0, // 待审核
  Passed = 1, // 已通过
  Deleted = -1, // 已删除
  Spam = -2, // 垃圾评论
}

registerEnumType(CommentStatus, {
  name: 'CommentStatus',
});

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field()
  @Column()
  body: string;

  @Field(() => Comment, { nullable: true })
  @OneToOne(() => Comment)
  @JoinColumn()
  parent?: Comment;

  @Field(() => CommentStatus)
  @Column('simple-enum', { enum: CommentStatus, comment: '评论状态' })
  status: CommentStatus;

  @Field(() => Article)
  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;
}
