import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@app.module';
import { environment } from '@app.environment';
import { TransformInterceptor } from '@shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@shared/filters/exception.filter';
import { ExceptionInterceptor } from '@shared/interceptors/exception.interceptor';
import { LoggingInterceptor } from '@shared/interceptors/logging.interceptor';
import helmet from 'helmet';
import compression from 'compression';
import { AppLogger } from '@shared/logger/app.logger';
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
    // new ClassSerializerInterceptor(new Reflector()),
  );
  app.setGlobalPrefix(process.env.SERVER_PREFIX);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Blog')
    .setDescription('A Blog System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

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
