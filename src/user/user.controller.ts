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
import { UserService } from '@user/user.service';
import { UserLoginDto } from '@user/dto/user-login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@user/user.entity';
import { UserRegisterDto } from '@user/dto/user-register.dto';
import { AuthService } from '@auth/auth.service';
import { Auth, User } from '@auth/auth.guard';
import { UserUpdateDto } from '@user/dto/user-update.dto';

@ApiTags('account')
@Controller('/account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Auth()
  getDetail(@User() user) {
    return user;
  }

  @Get(':username')
  findOneByName(@Param('username') username: string) {
    return this.userService.findOneByUsernameOrEmail(username);
  }

  @ApiBody({ type: UserLoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: UserLoginDto) {
    const { username, password } = user;
    const authResult = await this.authService.validateUser(username, password),
      token = await this.authService.certificate(authResult);
    delete authResult.password;
    return {
      ...authResult,
      token,
    };
  }

  @ApiBody({ type: UserRegisterDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: UserRegisterDto): Promise<string> {
    return this.userService.register(user);
  }

  @Post('test')
  @Auth('user.test', '测试')
  async test() {
    return 'success';
  }

  @Put()
  @Auth()
  @ApiResponse({ type: UserEntity })
  async update(@User() user: UserEntity, @Body() update: UserUpdateDto) {
    return this.userService.update(user.id, update);
  }

  @Put(':id')
  @Auth('user.updateById', '更新用户信息')
  async updateById(
    @Param('id') id: string,
    @Body() user: UserUpdateDto & { articleIds: string[]; roleIds: string[] },
  ) {
    return this.userService.update(id, user);
  }
}
