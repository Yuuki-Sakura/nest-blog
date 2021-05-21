import { Logger, Module } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PROJECT } = require('../config.json');

export class AppLogger extends Logger {
  constructor() {
    super(PROJECT.name);
  }
}

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
