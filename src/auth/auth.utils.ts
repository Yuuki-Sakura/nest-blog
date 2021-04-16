import { UserEntity } from '@user/user.entity';
import { Role } from '@role/role.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { createConnection, Repository } from 'typeorm';
import { Permission as PermissionEntity } from '@permission/permission.entity';
import { DATABASE } from '@config';
import { isProdMode } from '@app.environment';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '@auth/auth.guard';

export function hasPermission(resource: string, user: UserEntity): boolean;
export function hasPermission(resource: string, roles: Role[]): boolean;
export function hasPermission(resource: string, user: UserEntity | Role[]) {
  if (user instanceof UserEntity) {
    const roles = user.roles;
    if (roles?.length == 0) return false;
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < roles[i].permissions.length; j++)
        if (roles[j].permissions[j].resource === resource) return true;
    }
  } else {
    const roles = user;
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < roles[i].permissions.length; j++)
        if (roles[j].permissions[j].resource === resource) return true;
    }
  }
  return false;
}

export function hasContentPermission<Entity extends BaseEntity>(
  items: Array<Entity>,
  resource: string,
  user: UserEntity,
  id: Entity['id'],
) {
  if (!hasPermission(resource, user)) {
    let hasPerm = false;
    items.forEach((item) => {
      if (item.id != id) hasPerm = true;
    });
    if (!hasPerm) throw new ForbiddenException('无权限');
  }
}

const getPermissionRepo = (function () {
  let permissionRepo: Repository<PermissionEntity>;
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
      }).then((connection) => connection.getRepository(PermissionEntity));
    return permissionRepo;
  };
})();
const setPermission = async (resource: string, name: string) => {
  const permissionRepo = await getPermissionRepo();
  permissionRepo.findOne({ resource }).then((result) => {
    if (result) {
      if (result.name != name)
        permissionRepo.update(
          result.id,
          Object.assign(result, { resource, name }),
        );
    } else {
      permissionRepo.save(
        Object.assign(new PermissionEntity(), { resource, name }),
      );
    }
  });
};

export const Auth = (permission?: string, name?: string) => {
  if (permission) {
    return applyDecorators(
      ApiBearerAuth(),
      UseGuards(AuthGuard('jwt'), PermissionsGuard),
      Permission(permission, name),
    );
  } else return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard('jwt')));
};

export const Permission = (resource: string, name?: string) => {
  setPermission(resource, name);
  return applyDecorators(SetMetadata('resource', resource));
};

export { Permission as Perm };

export const GetPermission = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return Reflect.getMetadata('resource', ctx.getHandler());
  },
);

export { GetPermission as GetPerm };

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new UnauthorizedException('请登录');
    return request.user;
  },
);
