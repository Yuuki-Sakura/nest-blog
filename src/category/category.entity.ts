import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ArticleEntity } from '@article/article.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => ArticleEntity, (article) => article.category)
  article: ArticleEntity[];
}
