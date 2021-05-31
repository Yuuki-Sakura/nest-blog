import { Module } from '@nestjs/common';
import { HttpLogController } from './http-log.controller';
import { HttpLogService } from './http-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpLog } from '@http-log/http-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HttpLog])],
  controllers: [HttpLogController],
  providers: [HttpLogService],
  exports: [HttpLogService],
})
export class HttpLogModule {}
