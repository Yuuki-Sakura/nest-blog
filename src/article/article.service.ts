import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@article/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { ArticleCreateDto } from '@article/dto/article-create.dto';
import { TagService } from '@tag/tag.service';
import { CategoryService } from '@category/category.service';
import { ArticleUpdateDto } from '@article/dto/article-update.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: string) {
    return this.repository.findOne(id);
  }

  async create(
    author: UserEntity,
    { title, body, summary, categoryId, tagIds }: ArticleCreateDto,
  ) {
    const article: ArticleEntity = Object.assign(new ArticleEntity(), {
      author,
      title,
      body,
      summary,
    });
    article.tags = await this.tagService.findByIds(tagIds);
    article.category = await this.categoryService.findById(categoryId);
    return this.repository.save(article);
  }

  async update(
    id: string,
    { title, body, summary, categoryId, tagIds }: ArticleUpdateDto,
  ) {
    const article: ArticleEntity = Object.assign(
      await this.repository.findOne(id),
      {
        title,
        body,
        summary,
      },
    );
    article.tags = await this.tagService.findByIds(tagIds);
    article.category = await this.categoryService.findById(categoryId);
    return this.repository.update(id, article);
  }

  search(keyword: string) {
    return this.repository
      .createQueryBuilder('article')
      .where('article.title LIKE :title', { title: `%${keyword}%` })
      .orWhere('article.body LIKE :body', { body: `%${keyword}%` })
      .orWhere('article.summary LIKE :summary', { summary: `%${keyword}%` })
      .andWhere('article.published = :published', { published: true })
      .getMany();
  }

  delete(id: string) {
    return this.repository.softDelete(id);
  }
}
