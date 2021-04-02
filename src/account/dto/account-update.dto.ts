import { ApiProperty } from '@nestjs/swagger';

export class AccountUpdateDto {
  @ApiProperty()
  readonly username?: string;
  @ApiProperty()
  readonly email?: string;
  @ApiProperty()
  readonly avatar?: string;
}
