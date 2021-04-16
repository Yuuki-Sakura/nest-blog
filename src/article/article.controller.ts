import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from '@article/article.service';
import { UserEntity } from '@user/user.entity';
import { ArticleCreateDto } from '@article/dto/article-create.dto';
import { ArticleUpdateDto } from '@article/dto/article-update.dto';
import {
  Auth,
  GetPerm,
  hasContentPermission,
  Permission,
  User,
} from '@auth/auth.utils';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':keyword')
  search(@Param('keyword') keyword: string) {
    return this.articleService.search(keyword);
  }

  @Post()
  @Auth()
  create(@User() user: UserEntity, @Body() article: ArticleCreateDto) {
    return this.articleService.create(user, article);
  }

  @Put(':id')
  @Auth()
  @Permission('article.update', '更新文章')
  update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() article: ArticleUpdateDto,
    @GetPerm() permission: string,
  ) {
    hasContentPermission(user.articles, permission, user, id);
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  @Auth()
  @Permission('article.delete', '删除文章')
  delete(
    @User() user: UserEntity,
    @Param('id') id: string,
    @GetPerm() permission: string,
  ) {
    hasContentPermission(user.articles, permission, user, id);
    return this.articleService.delete(id);
  }
}
