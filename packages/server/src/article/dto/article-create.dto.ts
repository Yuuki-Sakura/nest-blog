import { ApiProperty } from '@nestjs/swagger';
import { PublishStatus } from '@article/article.entity';

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
  tags?: string[];
  @ApiProperty({ required: false, enum: PublishStatus })
  status?: PublishStatus;
}
