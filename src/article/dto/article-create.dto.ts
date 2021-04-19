import { ApiProperty } from '@nestjs/swagger';

export class ArticleCreateDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  summary: string;
  @ApiProperty()
  body: string;
  @ApiProperty({ required: false })
  categoryId?: string;
  @ApiProperty({ required: false })
  tagIds?: string[];
}
