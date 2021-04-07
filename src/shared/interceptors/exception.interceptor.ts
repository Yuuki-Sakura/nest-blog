/**
 * Error interceptor.
 * @file 错误拦截器
 * @module interceptor/error
 */

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { CustomException } from '@app/shared/exception/custom.exception';
import * as META from '@app/shared/constants/meta.constant';
import * as TEXT from '@app/shared/constants/text.constant';

/**
 * @class ExceptionInterceptor
 * @classdesc 当控制器所需的 Promise service 发生错误时，错误将在此被捕获
 */
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const target = context.getHandler();
    const statusCode = this.reflector.get<HttpStatus>(
      META.HTTP_ERROR_CODE,
      target,
    );
    const message =
      this.reflector.get<string>(META.HTTP_ERROR_MESSAGE, target) ||
      TEXT.HTTP_DEFAULT_ERROR_TEXT;
    return next
      .handle()
      .pipe(
        catchError((error) =>
          throwError(new CustomException({ message, error }, statusCode)),
        ),
      );
  }
}
