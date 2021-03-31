/**
 * App controller.
 * @file 主页控制器
 * @module app/controller
 */

import { Get, Controller } from '@nestjs/common';
import * as APP_CONFIG from '@app/app.config';

@Controller()
export class AppController {
  @Get()
  root(): any {
    return APP_CONFIG.PROJECT;
  }
}
