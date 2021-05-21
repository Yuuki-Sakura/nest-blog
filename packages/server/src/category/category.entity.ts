import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { Article } from '@article/article.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('category')
@ObjectType()
export class Category extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}
