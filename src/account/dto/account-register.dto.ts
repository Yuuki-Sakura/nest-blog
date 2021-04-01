import { IsNotEmpty } from 'class-validator';

export class AccountRegisterDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
