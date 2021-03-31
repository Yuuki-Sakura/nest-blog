import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return this.userRepository.find();
  }

  findOneByName(name: string) {
    return this.userRepository.findOne({ username: name });
  }
}
