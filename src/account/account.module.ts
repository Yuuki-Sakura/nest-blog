import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from '@app/account/account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth/auth.module';
import { RoleModule } from '@app/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    AuthModule,
    RoleModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
