import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Tag } from '@app/tag/tag.entity';
import { AccountEntity } from '@app/account/account.entity';
import { CategoryEntity } from '@app/category/category.entity';
import { BaseEntity } from '@app/shared/entity/base.entity';
import { Comment } from '@app/article/comment.entity';

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

  @ManyToOne(() => AccountEntity, (user) => user.articles)
  author: AccountEntity;

  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments: Comment[];
}
