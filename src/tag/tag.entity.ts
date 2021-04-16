import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ArticleEntity } from '@article/article.entity';
import { BaseEntity } from '@shared/entity/base.entity';

@Entity('tag')
export class Tag extends BaseEntity {
  @Column()
  tag: string;

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  articles: ArticleEntity[];
}
