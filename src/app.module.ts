import { MiddlewareConsumer, Module } from '@nestjs/common';

//中间件
import { OriginMiddleware } from '@app/shared/middlewares/origin.middleware';
import { CorsMiddleware } from '@app/shared/middlewares/cors.middleware';
import { AccountModule } from './account/account.module';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { AppController } from '@app/app.controller';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { cacheModule } from '@app/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 业务模块
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    cacheModule,
    AccountModule,
    ArticleModule,
    TagModule,
    CategoryModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
