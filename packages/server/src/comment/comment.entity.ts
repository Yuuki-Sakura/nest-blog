import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Article } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field()
  @Column()
  body: string;

  @Field(() => Comment)
  @OneToOne(() => Comment)
  @JoinColumn()
  recommend?: Comment;

  @Field(() => Article)
  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;
}
