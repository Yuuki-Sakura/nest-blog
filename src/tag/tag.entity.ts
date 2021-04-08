import { Column, Entity, ManyToOne } from 'typeorm';
import { ArticleEntity } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';

@Entity('tag')
export class Tag extends BaseEntity {
  @Column()
  tag: string;

  @ManyToOne(() => ArticleEntity, (article) => article.tags)
  article: ArticleEntity;
}
