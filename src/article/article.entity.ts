import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Tag } from '@tag/tag.entity';
import { UserEntity } from '@user/user.entity';
import { CategoryEntity } from '@category/category.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { Comment } from '@article/comment.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: '' })
  summary: string;

  @Column({ default: '' })
  body: string;

  @OneToOne(() => CategoryEntity)
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(() => Tag, (tag) => tag.article)
  @JoinColumn()
  tags: Tag[];

  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments: Comment[];
}
