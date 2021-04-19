import { Logger, Module } from '@nestjs/common';
import { PROJECT } from '@config';

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
