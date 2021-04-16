import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Role } from '@role/role.entity';
import { hasPermission } from '@auth/auth.utils';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    // 无权限标识的接口，直接通过
    if (permission) {
      // 获取用户角色
      return hasPermission(
        permission,
        await this.cacheManager.get<Role[]>(request.user.id),
      );
    }
    return true;
  }
}
