import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ArticleEntity } from '@article/article.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => ArticleEntity, (article) => article.category)
  articles: ArticleEntity[];
}
