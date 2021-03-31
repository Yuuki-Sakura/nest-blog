import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToOne(() => ArticleEntity, (article) => article.tags)
  article: ArticleEntity;
}
