import { MiddlewareConsumer, Module } from '@nestjs/common';
//中间件
import { OriginMiddleware } from '@shared/middlewares/origin.middleware';
import { CorsMiddleware } from '@shared/middlewares/cors.middleware';
import { UserModule } from '@user/user.module';
import { ArticleModule } from '@article/article.module';
import { TagModule } from '@tag/tag.module';
import { CategoryModule } from '@category/category.module';
import { AppController } from '@app.controller';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '@role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@shared/cache/cache.module';
import { PermissionModule } from '@permission/permission.module';

//配置文件
import { DATABASE } from '@config';
import { isProdMode } from '@app.environment';
import { HttpLogModule } from '@http-log/http-log.module';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';

// 业务模块
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      username: DATABASE.USERNAME,
      password: DATABASE.PASSWORD,
      database: DATABASE.DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      logging: !isProdMode,
    }),
    CacheModule,
    UserModule,
    ArticleModule,
    TagModule,
    CategoryModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    HttpLogModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware, CorsMiddleware, OriginMiddleware)
      .forRoutes('*');
  }
}
