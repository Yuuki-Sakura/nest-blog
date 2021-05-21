import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Article } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('tag')
@ObjectType()
export class Tag extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Field(() => [Article])
  @ManyToMany(() => Article)
  @JoinTable()
  articles: Article[];
}
