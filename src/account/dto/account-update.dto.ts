import { ApiProperty } from '@nestjs/swagger';

export class AccountUpdateDto {
  @ApiProperty()
  readonly username?: string;
  @ApiProperty()
  readonly email?: string;
  @ApiProperty()
  readonly phone?: string;
  @ApiProperty()
  readonly avatar?: string;
  @ApiProperty()
  readonly articleIds?: string[];
  @ApiProperty()
  readonly roleIds?: string[];
}
