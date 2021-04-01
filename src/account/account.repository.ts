import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from '@app/account/account.entity';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';

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
}
export const UserRepositoryProvider = {
  provide: 'AccountRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(AccountRepository),
  inject: [Connection],
};
