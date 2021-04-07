import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { environment } from '@app/app.environment';
import { TransformInterceptor } from '@app/shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@app/shared/filters/exception.filter';
import { ExceptionInterceptor } from '@app/shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from '@app/shared/interceptors/logging.interceptor';
import helmet from 'helmet';
import compression from 'compression';
import { AppLogger } from '@app/shared/logger/app.logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new AppLogger();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // isProdMode ? { logger: false } : undefined,
  );
  app.use(helmet());
  app.use(compression());
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new ExceptionInterceptor(new Reflector()),
    new LoggingInterceptor(logger),
  );
  app.setGlobalPrefix(process.env.SERVER_PREFIX);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Blog')
    .setDescription('A Blog System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap().then(() => {
  logger.log(
    `Nest Blog Run！at http://localhost:${process.env.SERVER_PORT}/api env:${environment}`,
  );
  logger.log(
    `Swagger is running at http://localhost:${process.env.SERVER_PORT}/api/doc`,
  );
});
