import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from '@account/account.service';
import { AccountLoginDto } from '@account/dto/account-login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '@account/account.entity';
import { AccountRegisterDto } from '@account/dto/account-register.dto';
import { AuthService } from '@auth/auth.service';
import { Account, Auth } from '@auth/auth.guard';
import { AccountUpdateDto } from '@account/dto/account-update.dto';

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Get('all')
  findAll() {
    return this.accountService.findAll();
  }

  @Get()
  getDetail(@Account() account) {
    return this.accountService.findById(account.id);
  }

  @Get(':username')
  findOneByName(@Param('username') username: string) {
    return this.accountService.findOneByUsernameOrEmail(username);
  }

  @ApiResponse({ type: AccountEntity })
  @ApiBody({ type: AccountLoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() account: AccountLoginDto) {
    const { username, password } = account;
    const authResult = await this.authService.validateUser(username, password),
      token = await this.authService.certificate(authResult);
    delete authResult.password;
    delete authResult.roles;
    return {
      ...authResult,
      token,
    };
  }

  @ApiBody({ type: AccountRegisterDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() account: AccountRegisterDto): Promise<string> {
    return this.accountService.register(account);
  }

  @Post('test')
  @Auth('account.test', '测试')
  async test() {
    return 'success';
  }

  @Put(':id')
  @Auth('account.update', '更新账户信息')
  async update(@Param('id') id: string, @Body() account: AccountUpdateDto) {
    return this.accountService.update(id, account);
  }
}
