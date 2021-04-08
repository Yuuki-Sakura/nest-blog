import {
  applyDecorators,
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
import { Cache } from 'cache-manager';
import { Role } from '@role/role.entity';

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
      const roles = (await this.cacheManager.get(request.user.id)) as Role[];
      let result = false;
      if (!roles) return result;
      for (let j = 0; j < roles.length; j++) {
        if (get(roles[j].permissions, permission)) result = true;
      }
      return result;
    }

    return true;
  }
}

export const Auth = (permission: string) => {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), PermissionsGuard),
    ApiBearerAuth(),
    SetMetadata('permission', permission),
  );
};
