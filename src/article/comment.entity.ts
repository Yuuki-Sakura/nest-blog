import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ArticleEntity } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  body: string;

  @OneToOne(() => Comment)
  @JoinColumn()
  recommend: Comment;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
