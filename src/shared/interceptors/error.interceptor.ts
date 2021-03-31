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
import { TMessage } from '@app/shared/interfaces/http.interface';
import { CustomError } from '@app/shared/errors/custom.error';
import * as META from '@app/shared/constants/meta.constant';
import * as TEXT from '@app/shared/constants/text.constant';

/**
 * @class ErrorInterceptor
 * @classdesc 当控制器所需的 Promise service 发生错误时，错误将在此被捕获
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    next.handle();
    const target = context.getHandler();
    const statusCode = this.reflector.get<HttpStatus>(
      META.HTTP_ERROR_CODE,
      target,
    );
    const message =
      this.reflector.get<TMessage>(META.HTTP_ERROR_MESSAGE, target) ||
      TEXT.HTTP_DEFAULT_ERROR_TEXT;
    return next
      .handle()
      .pipe(
        catchError((error) =>
          throwError(new CustomError({ message, error }, statusCode)),
        ),
      );
  }
}
