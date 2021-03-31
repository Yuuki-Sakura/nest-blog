import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  login() {
    return '';
  }
}
export const UserRepositoryProvider = {
  provide: 'UserRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(UserRepository),
  inject: [Connection],
};
