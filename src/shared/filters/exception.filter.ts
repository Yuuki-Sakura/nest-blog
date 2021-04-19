import { isDevMode } from '@app.environment';
import {
  EHttpStatus,
  THttpErrorResponse,
} from '@shared/interfaces/http.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { HTTP_UNAUTHORIZED_TEXT_DEFAULT } from '@shared/constants/text.constant';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { HttpLogService } from '@http-log/http-log.service';
import { AppLogger } from '@app.logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(AppLogger) private readonly logger: AppLogger,
    @Inject(HttpLogService) private readonly logService: HttpLogService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest();
    const status = exception.getStatus
      ? exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const stack = exception.stack;
    const data: THttpErrorResponse = {
      code: status,
      status: EHttpStatus.Error,
      message: exception.message,
      stack: null,
    };
    // 对默认的 404 进行特殊处理
    if (status === HttpStatus.NOT_FOUND) {
      data.message = `资源不存在`;
    }
    if (status === HttpStatus.UNAUTHORIZED) {
      data.message = HTTP_UNAUTHORIZED_TEXT_DEFAULT;
    }
    if (status === HttpStatus.FORBIDDEN) {
      data.message = '没有权限';
    }
    const content = request.method + ' -> ' + request.url;
    this.logger.error(
      `Error Response: ${content} HTTP/${request.httpVersion} ${status} ${request.headers['user-agent']}`,
    );
    if (
      !(
        status === HttpStatus.NOT_FOUND ||
        status === HttpStatus.UNAUTHORIZED ||
        status === HttpStatus.FORBIDDEN
      ) &&
      isDevMode
    ) {
      data.stack = stack;
      this.logger.error(stack);
    }
    this.logService.create({
      method: request.method,
      url: request.originalUrl,
      status: status,
      httpVersion: request.httpVersion,
      userAgent: request.headers['user-agent'],
      host: request.headers['host'],
      ip: request.ip,
      requestTime: new Date(Date.now()),
      headers: request.headers,
    });
    return response.status(status).jsonp(data);
  }
}

export const ExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
