import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { get } from 'lodash';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    // 无权限标识的接口，直接通过
    if (permissions) {
      const [role] = permissions;

      // 获取角色权限配置
      const roles = await this.cacheManager.get(
        `${request.user.id}-${request.user.accountId}`,
      );
      if (!get(roles, role)) return false;
    }

    return true;
  }
}

export const JwtPermissions = () => (...arg: any[]) => {
  const decorator: any = UseGuards(AuthGuard('jwt'), PermissionsGuard);
  return ApiBearerAuth()(decorator(...arg));
};

export const Permissions = (...permissions: string[]) => {
  return SetMetadata('permissions', permissions);
};
