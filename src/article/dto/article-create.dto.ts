export class ArticleCreateDto {
  title: string;
  summary: string;
  body: string;
  categoryId?: string;
  tagIds?: string[];
}
