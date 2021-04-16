import { Controller } from '@nestjs/common';
import { ArticleService } from '@article/article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
}
