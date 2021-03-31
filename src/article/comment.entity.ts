import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
