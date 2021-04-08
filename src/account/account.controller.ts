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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '@account/account.entity';
import { AccountRegisterDto } from '@account/dto/account-register.dto';
import { AuthService } from '@auth/auth.service';
import { Auth } from '@auth/auth.guard';
import { AccountUpdateDto } from '@account/dto/account-update.dto';

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':username')
  findOneByName(@Param('username') username: string) {
    return this.accountService.findOneByUsernameOrEmail(username);
  }

  @ApiResponse({ type: AccountEntity })
  @ApiBody({ type: AccountLoginDto })
  @Post('login')
  async login(@Body() account: AccountLoginDto) {
    const { username, password } = account;
    const authResult = await this.authService.validateUser(username, password);
    return { token: await this.authService.certificate(authResult) };
  }

  @ApiBody({ type: AccountRegisterDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() account: AccountRegisterDto): Promise<string> {
    return this.accountService.register(account);
  }

  @Auth('account.test.query')
  @ApiBearerAuth()
  @Post('test')
  async test() {
    return 'success';
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() account: AccountUpdateDto) {
    return this.accountService.update(id, account);
  }
}
