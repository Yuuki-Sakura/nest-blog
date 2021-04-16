import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { UserRegisterDto } from '@user/dto/user-register.dto';
import { HttpBadRequestException } from '@shared/exception/bad-request.exception';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findOneByUsernameOrEmail(username: string) {
    return await this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :username', { username })
      .leftJoinAndSelect('user.roles', 'role')
      .getOne();
  }

  async register(user: UserRegisterDto) {
    if (await this.findOne({ username: user.username })) {
      throw new BadRequestException(`用户名：'${user.username}' 已被使用`);
    }
    const result = await this.save(
      Object.assign({}, new UserEntity(), user) as UserEntity,
    );
    if (!result) {
      throw new HttpBadRequestException('注册失败');
    } else {
      return '注册成功';
    }
  }
}
