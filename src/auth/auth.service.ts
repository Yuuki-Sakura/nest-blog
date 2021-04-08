import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '@account/account.service';
import { AccountEntity } from '@account/account.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly accountService: AccountService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AccountEntity> {
    const account = await this.accountService.findOneByUsernameOrEmail(
      username,
    );
    if (account.password != password)
      throw new BadRequestException('用户名或密码错误');
    return account;
  }

  async certificate(account: AccountEntity) {
    const { username, email, password, roles, id } = account;
    await this.cacheManager.set(id, roles);
    account.loginDate = new Date();
    await this.accountService.update(account.id, account);
    return this.jwtService.sign({ id, username, email, password, roles });
  }
}
