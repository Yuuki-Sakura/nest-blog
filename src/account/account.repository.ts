import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from '@app/account/account.entity';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';
import { AccountRegisterDto } from '@app/account/dto/account-register.dto';
import { HttpBadRequestException } from '@app/shared/exception/bad-request.exception';

@Injectable()
@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {
  async login(account: AccountLoginDto) {
    const user = await this.createQueryBuilder('user')
      .where('user.username = :username', {
        username: account.username,
      })
      .orWhere('user.email = :email', { email: account.username })
      .getOne();
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
        `Username: '${account.username}' could not be used`,
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
export const UserRepositoryProvider = {
  provide: 'AccountRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(AccountRepository),
  inject: [Connection],
};
