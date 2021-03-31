import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '@app/tag/tag.entity';
import { UserEntity } from '@app/user/user.entity';
import { CategoryEntity } from '@app/category/category.entity';
import { Comment } from '@app/article/comment.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  summary: string;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updated: Date;

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
