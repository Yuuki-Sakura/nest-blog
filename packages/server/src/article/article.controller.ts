import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from '@article/article.service';
import { UserEntity } from '@user/user.entity';
import { ArticleCreateDto } from '@article/dto/article-create.dto';
import { ArticleUpdateDto } from '@article/dto/article-update.dto';
import { Auth, ContentProtect, User } from '@auth/auth.utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CommentCreateDto } from '@comment/dto/comment-create.dto';
import { PublishStatus } from '@article/article.entity';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  getArticle(
    @Param('id') id: string,
    @Query('password') password: string,
    @Query('answer') answer: string,
    @User(false) user?: UserEntity,
  ) {
    return this.articleService.findById(id, { password, answer, user });
  }
  @Get(':id/policy')
  getArticlePolicy(@Param('id') id: string, @User(false) user?: UserEntity) {
    return this.articleService.getArticlePolicy(id, user);
  }

  @Get('all')
  @Auth('article.findAll', '获取所有文章')
  getArticles() {
    return this.articleService.findAll();
  }

  @Post()
  @Auth()
  @ApiBody({ type: ArticleCreateDto })
  create(@User() user: UserEntity, @Body() article: ArticleCreateDto) {
    return this.articleService.create(user, article);
  }

  @Put(':id')
  @ContentProtect('articles', 'article.update', '更新文章')
  update(@Param('id') id: string, @Body() article: ArticleUpdateDto) {
    return this.articleService.update(id, article);
  }

  @Put(':id/publish')
  @ContentProtect('articles', 'article.publish', '发布文章')
  publish(@Param('id') id: string) {
    return this.articleService.update(id, { status: PublishStatus.Published });
  }

  @Delete(':id')
  @ContentProtect('articles', 'article.delete', '删除文章')
  delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }

  @Post(':articleId/comment')
  createComment(
    @Param('articleId') articleId: string,
    @Body() comment: CommentCreateDto,
    @User() user: UserEntity,
  ) {
    return this.articleService.createComment(articleId, { ...comment, user });
  }

  @Get(':articleId/comment')
  async getComment(@Param('articleId') id: string) {
    return (await this.articleService.findById(id, {})).comments;
  }
}
