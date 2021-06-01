import { ApiProperty } from '@nestjs/swagger';
import { PublishStatus } from '@article/article.entity';

export class ArticleUpdateDto {
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false })
  summary?: string;
  @ApiProperty({ required: false })
  body?: string;
  @ApiProperty({ required: false })
  categoryId?: string;
  @ApiProperty({ required: false })
  tags?: string[];
  @ApiProperty({ required: false, enum: PublishStatus })
  status?: PublishStatus;
}
