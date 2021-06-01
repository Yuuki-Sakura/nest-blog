import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, PublishStatus } from '@article/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { ArticleCreateDto } from '@article/dto/article-create.dto';
import { CategoryService } from '@category/category.service';
import { ArticleUpdateDto } from '@article/dto/article-update.dto';
import { Comment } from '@comment/comment.entity';
import { CommentCreateDto } from '@comment/dto/comment-create.dto';
import { CommentService } from '@comment/comment.service';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { PolicyType } from '@shared/classes/policy';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
    private readonly commentService: CommentService,
    private readonly categoryService: CategoryService,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findById(
    id: string,
    {
      password,
      answer,
      user,
    }: { password?: string; answer?: string; user?: UserEntity },
  ) {
    const article = await this.repository.findOne(id);
    switch (article.policy.type) {
      case PolicyType.Password:
        if (!password) throw new ForbiddenException('该文章需要密码');
        if (article.policy.password != password)
          throw new ForbiddenException('密码错误');
        break;
      case PolicyType.Private:
        if (article.author.id != user?.id)
          throw new ForbiddenException('该文章为私有文章');
        break;
      case PolicyType.Question:
        if (article.policy.question.answer != answer)
          throw new ForbiddenException('文章答案错误');
        break;
    }
    return article;
  }

  async create(
    author: UserEntity,
    { title, body, summary, categoryId, tags, status }: ArticleCreateDto,
  ) {
    const article: Partial<Article> = {
      author,
      title,
      body,
      summary,
      tags,
      status,
    };
    if (categoryId)
      article.category = await this.categoryService.findById(categoryId);
    return this.repository.save(article);
  }

  async update(
    id: string,
    { title, body, summary, categoryId, tags, status }: ArticleUpdateDto,
  ) {
    const article: Partial<Article> = {
      title,
      body,
      summary,
      tags,
      status,
    };
    if (categoryId)
      article.category = await this.categoryService.findById(categoryId);
    return this.repository.update(id, article);
  }

  publish(id: string) {
    return this.repository.update(id, {
      status: PublishStatus.Published,
    });
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
    if (
      article.commentPolicy.type == PolicyType.Private &&
      user.id != article.author.id
    ) {
      throw new BadRequestException('该文章未开启评论');
    }
    const parent = (
      await this.commentService.find({
        id: recommendId,
        article,
      })
    )[0];
    const comment: Comment = {
      ...new Comment(),
      body,
      article,
      parent,
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

  async getArticlePolicy(id: string, user?: UserEntity) {
    const article = await this.repository.findOne({ id });
    if (user && user.id == article.author.id) return { ...article.policy };
    return article.policy;
  }
}
