import { UserEntity } from '@user/user.entity';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from '@user/user.service';
import { UseGuards } from '@nestjs/common';
import { Role } from '@role/role.entity';
import { RoleService } from '@role/role.service';
import { AuthService } from '@auth/auth.service';
import { UserLoginDto } from '@user/dto/user-login.dto';
import { UserLoginResultDto } from '@user/dto/user-login-result.dto';
import { Permission, User } from '@auth/auth.utils';
import { GqlAuthGuard } from '@auth/gqlAuth.guard';
import { PermissionGuard } from '@auth/permission.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UserEntity])
  @UseGuards(GqlAuthGuard, PermissionGuard)
  @Permission('gql.user.getUsers', 'GraphQL 获取所有用户')
  async getUsers() {
    return await this.userService.findAll();
  }

  @ResolveField('roles', () => [Role])
  async getRoles(@Parent() user: UserEntity) {
    return await this.roleService.findByUser(user.id);
  }

  @Query(() => UserLoginResultDto)
  async login(@Args('input') { username, password }: UserLoginDto) {
    const user = await this.authService.validateUser(username, password);
    return Object.assign(new UserLoginResultDto(), {
      ...user,
      token: await this.authService.certificate(user),
    });
  }

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  getDetail(@User() user: UserEntity) {
    return user;
  }
}
