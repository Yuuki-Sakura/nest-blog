/**
 * Logging interceptor.
 * @file 日志拦截器
 * @module interceptor/logging
 */

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { isDevMode } from '@app.environment';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    if (!isDevMode) {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    this.logger.log('收到请求: ' + content);
    return next
      .handle()
      .pipe(tap(() => this.logger.log('响应请求: ' + content)));
  }
}
