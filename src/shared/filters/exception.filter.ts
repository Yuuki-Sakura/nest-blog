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
  Logger,
} from '@nestjs/common';
import { HTTP_UNAUTHORIZED_TEXT_DEFAULT } from '@shared/constants/text.constant';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus
      ? exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const stack = exception.stack;
    const data: THttpErrorResponse = {
      code: status,
      status: EHttpStatus.Error,
      message: exception.message,
      stack: isDevMode ? stack : null,
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
    this.logger.error(stack);
    return response.status(status).jsonp(data);
  }
}
