import { MiddlewareConsumer, Module } from '@nestjs/common';
//中间件
import { OriginMiddleware } from '@shared/middlewares/origin.middleware';
import { CorsMiddleware } from '@shared/middlewares/cors.middleware';
import { UserModule } from '@user/user.module';
import { ArticleModule } from '@article/article.module';
import { CategoryModule } from '@category/category.module';
import { AppController } from '@app.controller';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '@role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '@permission/permission.module';
import { isProdMode } from '@app.environment';
import { HttpLogModule } from '@http-log/http-log.module';
import { ExceptionFilterProvider } from '@shared/filters/exception.filter';
import { LoggingInterceptorProvider } from '@shared/interceptors/logging.interceptor';
import { LoggerModule } from '@app.logger';
import { CommentModule } from '@comment/comment.module';
import { ImModule } from '@im/im.module';
import { GraphQLModule } from '@nestjs/graphql';
import { DateScalar } from '@shared/scalars/date.scalar';
import { SearchModule } from '@search/search.module';
import { RedisModule } from '@shared/redis/redis.module';

//配置文件

// 业务模块
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      logging: !isProdMode,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      useGlobalPrefix: true,
      path: 'gql',
    }),
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
    UserModule,
    ArticleModule,
    CategoryModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    HttpLogModule,
    LoggerModule,
    CommentModule,
    ImModule,
    SearchModule,
  ],
  providers: [ExceptionFilterProvider, LoggingInterceptorProvider, DateScalar],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
