import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  permissionIds?: string[];
}
