import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserRepositoryProvider } from '@app/account/account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '@app/account/account.entity';
import { cacheModule } from '@app/app.config';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), cacheModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, UserRepositoryProvider],
  exports: [AccountService],
})
export class AccountModule {}
