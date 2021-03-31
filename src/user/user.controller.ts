import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@app/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }
}
