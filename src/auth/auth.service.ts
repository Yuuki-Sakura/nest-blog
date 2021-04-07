import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '@app/account/account.service';
import { AccountEntity } from '@app/account/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // @Inject(CACHE_MANAGER) private readonly cacheManager,
    private readonly accountService: AccountService,
  ) {}

  async validateUser(account: any): Promise<AccountEntity> {
    return await this.accountService.findOneByUsernameOrEmail(account.username);
  }

  async certificate(account: AccountEntity) {
    const { username, email, password, roles, id } = account;
    return this.jwtService.sign({ id, username, email, password, roles });
  }
}
