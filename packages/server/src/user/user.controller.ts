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
import { UserEntity as UserEntity } from '@user/user.entity';
import { UserRegisterDto } from '@user/dto/user-register.dto';
import { AuthService } from '@auth/auth.service';
import { Auth, Perm, Permission, Token, User } from '@auth/auth.utils';
import { UserUpdateDto } from '@user/dto/user-update.dto';
import { UserLoginResultDto } from '@user/dto/user-login-result.dto';
import { CommentService } from '@comment/comment.service';
import { ArticleService } from '@article/article.service';

@ApiTags('account')
@Controller('/account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  @Get('all')
  @Auth('user.findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Auth()
  getDetail(@User() user) {
    return user;
  }

  @Get('get/:username')
  findOneByName(@Param('username') username: string) {
    return this.userService.findOneByUsernameOrEmail(username);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ type: UserLoginResultDto })
  async login(@Body() user: UserLoginDto) {
    const { username, password } = user;
    const authResult = await this.authService.validateUser(username, password),
      token = await this.authService.certificate(authResult);
    delete authResult.password;
    return Object.assign(new UserLoginResultDto(), {
      ...authResult,
      token,
    });
  }

  @ApiBody({ type: UserRegisterDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    return this.userService.register(user);
  }

  @Post('test')
  @Auth()
  @Permission('account.test', '测试')
  async test(@User() user: UserEntity, @Perm() permission: string) {
    console.log(permission);
    return 'success';
  }

  @Put()
  @Auth()
  @ApiResponse({ type: UserEntity })
  async update(@User() user: UserEntity, @Body() update: UserUpdateDto) {
    return this.userService.update(user.id, update);
  }

  @Put(':id')
  @Auth('user.update', '更新用户信息')
  async updateById(
    @Param('id') id: string,
    @Body() user: UserUpdateDto & { articleIds: string[]; roleIds: string[] },
  ) {
    return this.userService.update(id, user);
  }

  @Get('articles')
  getArticlesByUser(@User() user: UserEntity) {
    return this.articleService.find({ author: user });
  }

  @Get('comments')
  getCommentsByUser(@User() user: UserEntity) {
    return this.commentService.find({ user });
  }
  @Get('logout')
  @Auth()
  logout(@User() user: UserEntity, @Token() token: string) {
    this.userService.logout(user, token);
  }
}
