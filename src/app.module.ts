import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as APP_CONFIG from '@app/app.config';

//中间件
import { OriginMiddleware } from '@app/shared/middlewares/origin.middleware';
import { CorsMiddleware } from '@app/shared/middlewares/cors.middleware';
import { AccountModule } from './account/account.module';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { AppController } from '@app/app.controller';

// 业务模块

@Module({
  imports: [
    TypeOrmModule.forRoot(APP_CONFIG.TYPEORM),
    AccountModule,
    ArticleModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
