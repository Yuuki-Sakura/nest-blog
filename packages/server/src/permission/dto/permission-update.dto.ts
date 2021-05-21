import { ApiProperty } from '@nestjs/swagger';
import { TMethod } from '@http-log/http-log.entity';

export class PermissionUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  resource?: string;

  @ApiProperty()
  route?: string;

  @ApiProperty()
  method?: TMethod;
}
