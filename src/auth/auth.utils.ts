import { UserEntity } from '@user/user.entity';
import { Role } from '@role/role.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '@auth/auth.guard';
import { ContentGuard } from '@auth/content.guard';

export function hasPermission(resource: string, user: UserEntity): boolean;
export function hasPermission(resource: string, roles: Role[]): boolean;
export function hasPermission(resource: string, user: UserEntity | Role[]) {
  if (!resource) return false;
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
    return hasPerm;
  }
  return true;
}

export const ContentProtect = (
  key: keyof UserEntity,
  resource?: string,
  name?: string,
) => {
  const perm = resource ? Permission(resource, name) : undefined;
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata('key', key),
    UseGuards(AuthGuard('jwt'), ContentGuard),
    perm,
  );
};

export const Auth = (resource?: string, name?: string) => {
  if (resource) {
    return applyDecorators(
      ApiBearerAuth(),
      UseGuards(AuthGuard('jwt'), PermissionsGuard),
      Permission(resource, name),
    );
  } else return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard('jwt')));
};

export const permissions: {
  name: string;
  resource: string;
  target: object;
  descriptor: TypedPropertyDescriptor<any>;
}[] = [];

export const Permission = (resource: string, name?: string) => {
  return applyDecorators(
    SetMetadata('resource', resource),
    (target, propertyKey, descriptor) => {
      permissions.push({ resource, name, target, descriptor });
    },
  );
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
