import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryProvider } from '@app/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepositoryProvider],
})
export class UserModule {}
