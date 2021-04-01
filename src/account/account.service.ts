import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '@app/account/account.repository';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';

@Injectable()
export class AccountService {
  constructor(private readonly userRepository: AccountRepository) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOneByName(name: string) {
    const user = await this.userRepository.findOne({ username: name });
    if (!user) {
      throw new NotFoundException(
        'Could not find account by username: ' + name,
      );
    }
    return user;
  }

  login(account: AccountLoginDto) {
    return this.userRepository.login(account);
  }
}
