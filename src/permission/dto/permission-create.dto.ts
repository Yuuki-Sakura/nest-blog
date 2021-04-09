import { ApiProperty } from '@nestjs/swagger';

export class PermissionCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  resources: string;
}
