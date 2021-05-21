import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@article/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { ArticleCreateDto } from '@article/dto/article-create.dto';
import { TagService } from '@tag/tag.service';
import { CategoryService } from '@category/category.service';
import { ArticleUpdateDto } from '@article/dto/article-update.dto';
import { Comment } from '@comment/comment.entity';
import { CommentCreateDto } from '@comment/dto/comment-create.dto';
import { CommentService } from '@comment/comment.service';
import { FindConditions } from 'typeorm/find-options/FindConditions';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
    private readonly commentService: CommentService,
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
    {
      title,
      body,
      summary,
      categoryId,
      tagIds,
      published,
      enableComment,
    }: ArticleCreateDto,
  ) {
    const article: Article = {
      ...new Article(),
      author,
      title,
      body,
      summary,
      publishAt: published ? new Date() : undefined,
      enableComment,
    };
    if (tagIds) article.tags = await this.tagService.findByIds(tagIds);
    if (categoryId)
      article.category = await this.categoryService.findById(categoryId);
    return this.repository.save(article);
  }

  async update(
    id: string,
    {
      title,
      body,
      summary,
      categoryId,
      tagIds,
      published,
      enableComment,
    }: ArticleUpdateDto,
  ) {
    const article: Article = {
      ...(await this.repository.findOne(id)),
      ...{
        title,
        body,
        summary,
        published,
        enableComment,
      },
    };
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

  async createComment(
    articleId: string,
    { body, recommendId, user }: CommentCreateDto & { user: UserEntity },
  ) {
    const article = await this.repository.findOne({ id: articleId });
    if (!article.enableComment) {
      throw new BadRequestException('该文章未开启评论');
    }
    const recommend = (
      await this.commentService.find({
        id: recommendId,
        article,
      })
    )[0];
    const comment: Comment = {
      ...new Comment(),
      body,
      article,
      recommend,
      user,
    };
    article.comments.push(comment);
    return await this.repository.save(article);
  }

  async deleteComment(articleId: string, commentId: string) {
    const article = await this.repository.findOne({ id: articleId });
    const comment = (
      await this.commentService.find({
        id: commentId,
        article,
      })
    )[0];
    if (!comment) {
      throw new BadRequestException('评论id无效');
    }
    return this.commentService.softDelete(comment);
  }

  find(conditions?: FindConditions<Article>) {
    return this.repository.find(conditions);
  }
}
