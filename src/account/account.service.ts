import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '@app/account/account.repository';
import { AccountRegisterDto } from '@app/account/dto/account-register.dto';
import { AccountUpdateDto } from '@app/account/dto/account-update.dto';
import { RoleService } from '@app/role/role.service';
import { AccountEntity } from '@app/account/account.entity';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly roleService: RoleService,
  ) {}

  findAll() {
    return this.accountRepository.find();
  }

  async findOneByUsernameOrEmail(username: string) {
    const user = await this.accountRepository.findOneByUsernameOrEmail(
      username,
    );
    if (!user) {
      throw new NotFoundException('用户名或邮箱无效');
    }
    return user;
  }

  register(account: AccountRegisterDto) {
    return this.accountRepository.register(account);
  }

  async update(id: string, account: AccountUpdateDto | AccountEntity) {
    if (account instanceof AccountUpdateDto) {
      const accountE = await this.accountRepository.findOne(id);
      if (!accountE.roles) accountE.roles = [];
      if (account.roleIds) {
        const roles = await this.roleService.findByIds(account.roleIds);
        accountE.roles.push(...roles);
      }
    }
    return await this.accountRepository.save(account);
  }
}
