import { ApiProperty } from '@nestjs/swagger';

export class PermissionUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  resources?: string;
}
