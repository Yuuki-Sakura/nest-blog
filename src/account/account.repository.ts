import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from '@account/account.entity';
import { AccountLoginDto } from '@account/dto/account-login.dto';
import { AccountRegisterDto } from '@account/dto/account-register.dto';
import { HttpBadRequestException } from '@shared/exception/bad-request.exception';

@Injectable()
@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {
  async findOneByUsernameOrEmail(username: string) {
    return await this.createQueryBuilder('account')
      .where('account.username = :username', { username })
      .orWhere('account.email = :username', { username })
      .leftJoinAndSelect('account.roles', 'role')
      .getOne();
  }
  async login(account: AccountLoginDto) {
    const user = this.findOneByUsernameOrEmail(account.username);
    if (!user) {
      throw new NotFoundException(
        'Could not find account by username or email: ' + account.username,
      );
    }
    return user;
  }
  async register(account: AccountRegisterDto) {
    if (await this.findOne({ username: account.username })) {
      throw new BadRequestException(
        `Username: '${account.username}' could not be use`,
      );
    }
    const result = await this.save(
      Object.assign(new AccountEntity(), account) as AccountEntity,
    );
    if (!result) {
      throw new HttpBadRequestException('Create account failed');
    } else {
      return 'Account create success';
    }
  }
}
