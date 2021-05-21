/**
 * App controllers.
 * @file 主页控制器
 * @module app/controllers
 */

import { Controller, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PROJECT } = require('../config.json');

@Controller()
export class AppController {
  @Get()
  root(): any {
    return PROJECT;
  }
}
