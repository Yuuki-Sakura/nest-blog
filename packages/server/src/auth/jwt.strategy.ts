import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@user/user.entity';
import { HttpUnauthorizedException } from '@shared/exception/unauthorized.exception';
import { UserService } from '@user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const { username, password } = payload;
    const user = await this.userService.findOneByUsernameOrEmail(username);
    if (user.password != password) {
      throw new HttpUnauthorizedException();
    }
    return user;
  }
}
