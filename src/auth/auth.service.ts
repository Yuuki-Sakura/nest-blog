import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { UserEntity } from '@user/user.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOneByUsernameOrEmail(username);
    if (user.password != password)
      throw new BadRequestException('用户名或密码错误');
    return user;
  }

  async certificate(user: UserEntity) {
    const { username, email, roles, id } = user;
    if (roles) await this.cacheManager.set(id, roles);
    user.loginTime = new Date();
    await this.userService.update(user.id, user);
    return this.jwtService.sign({ id, username, email });
  }
}
