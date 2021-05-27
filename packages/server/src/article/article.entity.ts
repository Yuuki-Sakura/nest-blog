import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { Category } from '@category/category.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { Comment } from '@comment/comment.entity';
import { Timestamp } from '@shared/decorator/timestamp.decorator';
import { Field, ObjectType } from '@nestjs/graphql';

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

  @Field()
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

  @Field()
  @Timestamp({ comment: '发布时间', default: null, name: 'publish_at' })
  publishAt: Date;

  @Field()
  @Column({ default: true, comment: '开启评论' })
  enableComment: boolean;
}
