import { Column, Entity, ManyToOne } from 'typeorm';
import { ArticleEntity } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  body: string;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
