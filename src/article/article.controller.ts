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
import { Auth, ContentProtect, User } from '@auth/auth.utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':keyword')
  search(@Param('keyword') keyword: string) {
    return this.articleService.search(keyword);
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

  @Delete(':id')
  @ContentProtect('articles', 'article.delete', '删除文章')
  delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
