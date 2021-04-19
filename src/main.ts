import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@app.module';
import { environment } from '@app.environment';
import { TransformInterceptor } from '@shared/interceptors/transform.interceptor';
import helmet from 'helmet';
import compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  INestApplication,
  RequestMethod,
} from '@nestjs/common';
import { ADMIN, SERVER } from '@config';
import { ValidationPipe } from '@shared/pipes/validation.pipe';
import { AppLogger } from '@app.logger';
import { PermissionService } from '@permission/permission.service';
import { RoleService } from '@role/role.service';
import { UserService } from '@user/user.service';
import { permissions } from '@auth/auth.utils';
import { TMethod } from '@http-log/http-log.entity';

let logger;
let app: INestApplication;

async function init(app: INestApplication) {
  const permissionService: PermissionService = app.get<PermissionService>(
    PermissionService,
  );
  for (const permission of permissions) {
    const { resource, name, target, descriptor } = permission;
    let controllerPath: string = Reflect.getMetadata(
        'path',
        target.constructor,
      ),
      methodPath: string = Reflect.getMetadata('path', descriptor.value);
    controllerPath =
      controllerPath.charAt(0) === '/' ? controllerPath : '/' + controllerPath;
    controllerPath =
      controllerPath.charAt(controllerPath.length - 1) === '/'
        ? controllerPath
        : controllerPath + '/';
    methodPath =
      methodPath.charAt(0) === '/' ? methodPath.slice(1) : methodPath;
    const route = controllerPath + methodPath;
    const method: TMethod = RequestMethod[
      Reflect.getMetadata('method', descriptor.value)
    ] as TMethod;
    const result = await permissionService.findOne({ resource });
    if (result) {
      await permissionService.update(result.id, {
        resource,
        name,
        route,
        method,
      });
    } else {
      await permissionService.save({ resource, name, route, method });
    }
  }

  const roleService: RoleService = app.get<RoleService>(RoleService);

  let adminRole = await roleService.findOneByName('admin');
  const perms = await permissionService.findAll();
  const permissionIds = await (async function () {
    const ids: string[] = [];
    perms.forEach((permission) => {
      ids.push(permission.id);
    });
    return ids;
  })();

  if (!adminRole) {
    adminRole = await roleService.save({
      name: 'admin',
      permissionIds,
    });
  } else {
    adminRole = await roleService.update(adminRole.id, { permissionIds });
  }

  const userService: UserService = app.get<UserService>(UserService);
  const user = await (async function () {
    try {
      return await userService.findOneByUsernameOrEmail('admin');
    } catch (e) {
      return;
    }
  })();
  if (!user) {
    const result = await userService.register({
      username: ADMIN.USERNAME,
      email: ADMIN.EMAIL,
      password: ADMIN.PASSWORD,
    });
    if (!result.roles) result.roles = [];
    result.roles.push(adminRole);
    await userService.update(result.id, result);
  } else {
    if (user.roles.filter((role) => role.id == adminRole.id).length == 0) {
      user.roles.push(adminRole);
      await userService.update(user.id, user);
    }
  }
}

async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    // new LoggingInterceptor(logger),
    new ClassSerializerInterceptor(new Reflector()),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(SERVER.PREFIX);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Blog')
    .setDescription('A Blog System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SERVER.SWAGGER_PREFIX, app, document);

  logger = app.get<AppLogger>(AppLogger);
  logger.setContext('Nest Blog');
  app.useLogger(logger);
  await app.listen(SERVER.PORT);
}

bootstrap().then(async () => {
  await init(app);
  logger.log(
    `Nest Blog Run！at http://localhost:${
      SERVER.PORT + SERVER.PREFIX
    } env:${environment}`,
  );
  logger.log(
    `Swagger is running at http://localhost:${
      SERVER.PORT + SERVER.SWAGGER_PREFIX
    }`,
  );
});
