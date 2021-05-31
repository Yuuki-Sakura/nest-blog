import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@article/article.entity';
import { Comment } from '@comment/comment.entity';
import { CategoryModule } from '@category/category.module';
import { CommentModule } from '@comment/comment.module';
import { SearchModule } from '@search/search.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment]),
    CategoryModule,
    CommentModule,
    SearchModule,
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
