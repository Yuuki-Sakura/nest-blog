import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '@account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '@config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES },
    }),
    forwardRef(() => AccountModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
