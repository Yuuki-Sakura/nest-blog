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
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleService } from '@role/role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(RoleService)
    private readonly roleService: RoleService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    let request;
    if (gqlCtx.getType() == 'graphql') {
      request = gqlCtx['args'][2]['req'];
    } else {
      request = context.switchToHttp().getRequest();
    }
    const permission = this.reflector.get<string>(
      'resource',
      context.getHandler(),
    );
    // 无权限标识的接口，直接通过
    if (permission) {
      // 获取用户角色
      const roles =
        (await this.cacheManager.get<Role[]>(request.user.id)) ||
        (await this.roleService.findByUser(request.user.id));
      return hasPermission(permission, roles);
    }
    return true;
  }
}
