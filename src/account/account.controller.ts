import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '@app/account/account.service';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '@app/account/account.entity';

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(private readonly userService: AccountService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  @ApiResponse({ type: AccountEntity })
  @ApiBody({ type: AccountLoginDto })
  @Post('login')
  login(@Body() account: AccountLoginDto) {
    return this.userService.login(account);
  }
}
