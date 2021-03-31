import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import * as APP_CONFIG from '@app/app.config';
import { environment, isProdMode } from '@app/app.environment';
import { TransformInterceptor } from '@app/shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@app/shared/filters/exception.filter';
import { ErrorInterceptor } from '@app/shared/interceptors/error.interceptor';
import { LoggingInterceptor } from '@app/shared/interceptors/logging.interceptor';
import helmet from 'helmet';
import compression from 'compression';
import { AppLogger } from '@app/shared/logger/app.logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new AppLogger();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    isProdMode ? { logger: false } : null,
  );
  app.use(helmet());
  app.use(compression());
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new ErrorInterceptor(new Reflector()),
    new LoggingInterceptor(logger),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest Blog')
    .setDescription('A Blog System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(APP_CONFIG.APP.PORT);
}
bootstrap().then(() => {
  logger.log(
    `Nest Blog Run！at http://localhost:${APP_CONFIG.APP.PORT}, env: ${environment}`,
  );
  logger.log(
    `Swagger is running at http://localhost:${APP_CONFIG.APP.PORT}/doc`,
  );
});
