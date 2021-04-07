import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AccountService } from '@app/account/account.service';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '@app/account/account.entity';
import { AccountRegisterDto } from '@app/account/dto/account-register.dto';
import { AuthService } from '@app/auth/auth.service';

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(
    private readonly userService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOneByName(@Param('username') username: string) {
    return this.userService.findOneByUsernameOrEmail(username);
  }

  @ApiResponse({ type: AccountEntity })
  @ApiBody({ type: AccountLoginDto })
  @Post('login')
  async login(@Body() account: AccountLoginDto) {
    const authResult = await this.authService.validateUser(account);
    return { token: await this.authService.certificate(authResult) };
  }

  @ApiBody({ type: AccountRegisterDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() account: AccountRegisterDto): Promise<string> {
    return this.userService.register(account);
  }
}
