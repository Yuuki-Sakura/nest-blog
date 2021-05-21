import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
  @ApiProperty()
  body: string;

  @IsUUID()
  @ApiProperty({ required: false })
  recommendId: string;
}
