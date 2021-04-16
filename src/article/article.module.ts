import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@article/article.entity';
import { Comment } from '@article/comment.entity';
import { TagModule } from '@tag/tag.module';
import { CategoryModule } from '@category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, Comment]),
    TagModule,
    CategoryModule,
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
