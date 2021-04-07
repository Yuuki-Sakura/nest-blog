import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '@app/account/account.repository';
import { AccountLoginDto } from '@app/account/dto/account-login.dto';
import { AccountRegisterDto } from '@app/account/dto/account-register.dto';

@Injectable()
export class AccountService {
  constructor(private readonly userRepository: AccountRepository) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOneByUsernameOrEmail(username: string) {
    const user = await this.userRepository.findOneByUsernameOrEmail(username);
    if (!user) {
      throw new NotFoundException('用户名或邮箱无效');
    }
    return user;
  }

  login(account: AccountLoginDto) {
    return this.userRepository.login(account);
  }
  register(account: AccountRegisterDto) {
    return this.userRepository.register(account);
  }
}
