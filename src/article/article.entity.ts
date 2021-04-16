import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tag } from '@tag/tag.entity';
import { UserEntity } from '@user/user.entity';
import { CategoryEntity } from '@category/category.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { Comment } from '@article/comment.entity';
import { Timestamp } from '@shared/decorator/timestamp.decorator';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: '' })
  summary: string;

  @Column({ default: '' })
  body: string;

  @ManyToOne(() => CategoryEntity, (category) => category.articles)
  category: CategoryEntity;

  @ManyToMany(() => Tag)
  @JoinColumn()
  tags: Tag[];

  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments: Comment[];

  @Column({ default: false })
  published: boolean;

  @DeleteDateColumn({
    type: 'timestamp',
    comment: '删除时间',
    name: 'delete_time',
  })
  @Timestamp()
  deleteTime: Date;
}
