import { CanActivate, ExecutionContext } from '@nestjs/common';
import { hasContentPermission } from '@auth/auth.utils';

export class ContentGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const key = Reflect.getMetadata('key', context.getHandler());
    const resource = Reflect.getMetadata('resource', context.getHandler());
    const content = request.user[key] || [];
    return hasContentPermission(
      content,
      resource,
      request.user,
      request.params.id,
    );
  }
}
