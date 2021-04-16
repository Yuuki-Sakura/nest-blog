import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpLogService } from '@http-log/http-log.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logService: HttpLogService) {}
  use(req: any, res: any, next: () => void) {
    const time = new Date(Date.now());
    this.logService.create({
      method: req.method,
      url: req.originalUrl,
      httpVersion: req.httpVersion,
      userAgent: req.headers['user-agent'],
      host: req.headers['host'],
      ip: req.ip,
      requestTime: time,
      headers: req.headers,
    });
    next();
  }
}
