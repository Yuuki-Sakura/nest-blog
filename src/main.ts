import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@app.module';
import { environment } from '@app.environment';
import { TransformInterceptor } from '@shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@shared/filters/exception.filter';
import { LoggingInterceptor } from '@shared/interceptors/logging.interceptor';
import helmet from 'helmet';
import compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { SERVER } from '@config';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

const logger = new Logger('Nest Blog');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new LoggingInterceptor(logger),
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

  await app.listen(SERVER.PORT);
}
bootstrap().then(() => {
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
