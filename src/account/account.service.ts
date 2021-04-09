import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '@account/account.repository';
import { AccountRegisterDto } from '@account/dto/account-register.dto';
import { AccountUpdateDto } from '@account/dto/account-update.dto';
import { RoleService } from '@role/role.service';
import { AccountEntity } from '@account/account.entity';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly roleService: RoleService,
  ) {}

  async findAll() {
    return await this.accountRepository.find();
  }

  async findById(id: string) {
    return this.accountRepository.findOne(id);
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

  // buildAccountDto(account: AccountEntity | AccountEntity[]) {
  //   function f(account:AccountEntity) {
  //     return {
  //       id: account.id,
  //       username: account.username,
  //       email: account.email,
  //       phone: account.phone,
  //       avatar: account.avatar,
  //       status: account.status,
  //       createDate: account.createDate,
  //       updateDate: account.updateDate,
  //       loginDate: account.loginDate,
  //     } as AccountDto;
  //   }
  //   if (account instanceof Array) {
  //     const accounts: AccountDto[] = [];
  //     account.forEach((account) => {
  //       accounts.push({
  //         id: account.id,
  //         username: account.username,
  //         email: account.email,
  //         phone: account.phone,
  //         avatar: account.avatar,
  //         status: account.status,
  //         createDate: account.createDate,
  //         updateDate: account.updateDate,
  //         loginDate: account.loginDate,
  //       } as AccountDto);
  //     });
  //     return accounts
  //   } else {
  //
  //   }
  // }
}
