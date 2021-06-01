/**
 * Origin middleware.
 * @file Origin 中间件
 * @module middleware/origin
 */

import { Request, Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { isProdMode } from '@app.environment';
import * as TEXT from '@shared/constants/text.constant';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CROSS_DOMAIN } = require('../../../config.json');

/**
 * @class OriginMiddleware
 * @classdesc 用于验证是否为非法来源请求
 */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    // 如果是生产环境，需要验证用户来源渠道，防止非正常请求
    if (isProdMode) {
      const { origin, referer } = request.headers;
      const checkHeader = (field) =>
        !field || field.includes(CROSS_DOMAIN.AllowReferer);
      const isVerifiedOrigin = checkHeader(origin);
      const isVerifiedReferer = checkHeader(referer);
      if (!isVerifiedOrigin && !isVerifiedReferer) {
        return response.status(HttpStatus.UNAUTHORIZED).jsonp({
          code: HttpStatus.UNAUTHORIZED,
          message: TEXT.HTTP_ANONYMOUS_TEXT,
        });
      }
    }

    // 其他通行
    return next();
  }
}
