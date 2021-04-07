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
import { AccountService } from '@app/account/account.service';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '@app/account/account.entity';
import { AccountRegisterDto } from '@app/account/dto/account-register.dto';
import { AuthService } from '@app/auth/auth.service';
import { Auth } from '@app/auth/auth.guard';
import { AccountUpdateDto } from '@app/account/dto/account-update.dto';

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
