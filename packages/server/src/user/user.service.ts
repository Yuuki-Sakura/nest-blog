import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@user/user.repository';
import { UserRegisterDto } from '@user/dto/user-register.dto';
import { UserUpdateDto } from '@user/dto/user-update.dto';
import { RoleService } from '@role/role.service';
import { UserEntity } from '@user/user.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll() {
    return await this.userRepository.find({});
  }

  async findById(id: string) {
    return this.userRepository.findOne(id);
  }

  async findOneByUsernameOrEmail(username: string) {
    const user = await this.userRepository.findOneByUsernameOrEmail(username);
    if (!user) {
      throw new NotFoundException('用户名或邮箱无效');
    }
    return user;
  }

  register(user: UserRegisterDto) {
    return this.userRepository.register(user);
  }

  async update(
    id: string,
    user:
      | (UserUpdateDto & { articleIds?: string[]; roleIds?: string[] })
      | UserEntity,
  ) {
    const user1 = await this.userRepository.findOne(id);
    if (!user1) throw new BadRequestException('用户id无效');
    if (!(user instanceof UserEntity)) {
      if (!user1.roles) user1.roles = [];
      if (user.roleIds) {
        const roles = await this.roleService.findByIds(user.roleIds);
        user1.roles.push(...roles);
        await this.cacheManager.set(id, user1.roles);
      }
    }
    return await this.userRepository.save(user);
  }

  // buildUserDto(user: UserEntity | UserEntity[]) {
  //   function f(user:UserEntity) {
  //     return {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //       phone: user.phone,
  //       avatar: user.avatar,
  //       status: user.status,
  //       createDate: user.createDate,
  //       updateDate: user.updateDate,
  //       loginDate: user.loginDate,
  //     } as UserDto;
  //   }
  //   if (user instanceof Array) {
  //     const users: UserDto[] = [];
  //     user.forEach((user) => {
  //       users.push({
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         phone: user.phone,
  //         avatar: user.avatar,
  //         status: user.status,
  //         createDate: user.createDate,
  //         updateDate: user.updateDate,
  //         loginDate: user.loginDate,
  //       } as UserDto);
  //     });
  //     return users
  //   } else {
  //
  //   }
  // }
}
