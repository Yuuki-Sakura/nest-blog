import { isDevMode } from '@app/app.environment';
import {
  EHttpStatus,
  THttpErrorResponse,
  TExceptionOption,
  TMessage,
} from '@app/shared/interfaces/http.interface';
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
    const isString = (value): value is TMessage => typeof value === 'string';
    const errMessage = isString(errorOption)
      ? errorOption
      : errorOption.message;
    const errorInfo = isString(errorOption) ? null : errorOption.error;
    const parentErrorInfo = errorInfo ? String(errorInfo) : null;
    const isChildrenError = errorInfo?.status && errorInfo?.message;
    const resultError =
      (isChildrenError && errorInfo.message) || parentErrorInfo;
    const resultStatus = isChildrenError ? errorInfo.status : status;
    const data: THttpErrorResponse = {
      code: response.statusCode,
      status: EHttpStatus.Error,
      message: errMessage,
      error: resultError,
      debug: isDevMode ? exception.stack : null,
    };
    // 对默认的 404 进行特殊处理
    if (status === HttpStatus.NOT_FOUND) {
      data.error = `资源不存在`;
      data.message = `接口 ${request.method} -> ${request.url} 无效`;
    }
    return response.status(resultStatus).jsonp(data);
  }
}
