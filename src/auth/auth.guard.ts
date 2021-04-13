import {
  applyDecorators,
  CACHE_MANAGER,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { Role } from '@role/role.entity';
import { createConnection, Repository } from 'typeorm';
import { Permission } from '@permission/permission.entity';
import { DATABASE } from '@config';
import { isProdMode } from '@app.environment';

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
      // if (!request.user) return false;
      // 获取用户角色
      const roles = (await this.cacheManager.get(request.user.id)) as Role[];
      if (!roles) return false;
      for (let i = 0; i < roles.length; i++) {
        for (let j = 0; j < roles[i].permissions.length; j++)
          if (roles[j].permissions[j].resources === permission) return true;
      }
      return false;
    }

    return true;
  }
}

const getPermissionRepo = (function () {
  let permissionRepo: Repository<Permission>;
  return async function () {
    if (!permissionRepo)
      permissionRepo = await createConnection({
        type: 'mysql',
        host: DATABASE.HOST,
        port: DATABASE.PORT,
        username: DATABASE.USERNAME,
        password: DATABASE.PASSWORD,
        database: DATABASE.DATABASE,
        entities: [Permission],
        logging: !isProdMode,
      }).then((connection) => connection.getRepository(Permission));
    return permissionRepo;
  };
})();
const setPermission = async (permission: string, name: string) => {
  const permissionRepo = await getPermissionRepo();
  permissionRepo.findOne({ resources: permission }).then((result) => {
    if (result) {
      if (result.name != name)
        permissionRepo.update(
          result.id,
          Object.assign(result, { resources: permission, name }),
        );
    } else {
      permissionRepo.save(
        Object.assign(new Permission(), { resources: permission, name }),
      );
    }
  });
};

export const Auth = (permission?: string, name?: string) => {
  if (permission) {
    setPermission(permission, name);
    return applyDecorators(
      ApiBearerAuth(),
      UseGuards(AuthGuard('jwt'), PermissionsGuard),
      SetMetadata('permission', permission),
    );
  } else return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard('jwt')));
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new UnauthorizedException('请登录');
    return request.user;
  },
);
