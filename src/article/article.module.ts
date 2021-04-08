import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@article/article.entity';
import { Comment } from '@article/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, Comment])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
