import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { Category } from '@category/category.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { Comment } from '@comment/comment.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Policy } from '@shared/classes/policy';

export enum PublishStatus {
  Draft = 0, // 草稿
  Published = 1, // 已发布
  Recycle = -1, // 回收站
}

registerEnumType(PublishStatus, {
  name: 'PublishStatus',
});

@Entity('article')
@ObjectType()
export class Article extends BaseEntity {
  @Field()
  @Column({ comment: '文章标题' })
  title: string;

  @Field()
  @Column('mediumtext', { comment: '概述' })
  summary: string;

  @Field()
  @Column('mediumtext', { comment: '文章' })
  body: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;

  @Field(() => [String])
  @Column('simple-array')
  @JoinColumn()
  tags: string[];

  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments: Comment[];

  @Field(() => PublishStatus)
  @Column('simple-enum', { enum: PublishStatus, comment: '发布状态' })
  status: PublishStatus;

  @Field(() => Policy)
  @Column('simple-json', { comment: '文章查看策略' })
  policy: Policy;

  @Field(() => Policy)
  @Column('simple-json', { comment: '文章评论策略' })
  commentPolicy: Policy;
}
