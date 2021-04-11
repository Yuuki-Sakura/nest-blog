/**
 * App controller.
 * @file 主页控制器
 * @module app/controller
 */

import { Get, Controller } from '@nestjs/common';
import { PROJECT } from '@config';

@Controller()
export class AppController {
  @Get()
  root(): any {
    return PROJECT;
  }
}
