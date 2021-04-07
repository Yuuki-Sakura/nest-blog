import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '@app/account/account.entity';
import { HttpUnauthorizedException } from '@app/shared/exception/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<AccountEntity> {
    const { username, password } = payload;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpUnauthorizedException();
    }
    return user;
  }
}
