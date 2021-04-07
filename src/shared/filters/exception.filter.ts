import { isDevMode } from '@app/app.environment';
import {
  EHttpStatus,
  THttpErrorResponse,
  TExceptionOption,
} from '@app/shared/interfaces/http.interface';
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AppLogger } from '@app/shared/logger/app.logger';
import { HTTP_UNAUTHORIZED_TEXT_DEFAULT } from '@app/shared/constants/text.constant';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus
      ? exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: TExceptionOption = exception.getResponse
      ? (exception.getResponse() as TExceptionOption)
      : null;
    const errorInfo = errorOption?.error;
    const isChildrenError = errorInfo?.status && errorInfo?.message;
    const resultError = (isChildrenError && errorInfo?.message) || errorInfo;
    const resultStatus = isChildrenError ? errorInfo.status : status;
    const stack = errorOption?.error?.stack || exception.stack;
    const data: THttpErrorResponse = {
      code: resultStatus,
      status: EHttpStatus.Error,
      message: resultError || exception.message,
      stack: isDevMode ? stack : null,
    };
    // 对默认的 404 进行特殊处理
    if (status === HttpStatus.NOT_FOUND) {
      data.message = `资源不存在`;
    }
    if (status === HttpStatus.UNAUTHORIZED) {
      data.message = HTTP_UNAUTHORIZED_TEXT_DEFAULT;
    }
    this.logger.error(stack);
    return response.status(resultStatus).jsonp(data);
  }
}
