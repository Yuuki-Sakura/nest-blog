import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
  constructor() {
    super('Nest Blog', true);
  }
  log(message: string, context?: string) {
    super.log(message, context);
  }
  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }
  warn(message: string, context?: string) {
    super.warn(message, context);
  }
  debug(message: string, context?: string) {
    super.debug(message, context);
  }
  verbose(message: string, context?: string) {
    super.verbose(message, context);
  }
}
