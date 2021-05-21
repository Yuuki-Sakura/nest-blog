import { ApiProperty } from '@nestjs/swagger';

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
  tagIds?: string[];
  @ApiProperty({ required: false })
  published?: boolean;
  @ApiProperty({ required: false })
  enableComment?: boolean;
}
