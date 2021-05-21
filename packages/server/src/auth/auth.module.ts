import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from '@role/role.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JWT } = require('../../config.json');

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES },
    }),
    forwardRef(() => UserModule),
    RoleModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
