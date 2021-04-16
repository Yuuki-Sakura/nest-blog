import { Module } from '@nestjs/common';
import { HttpLogController } from './http-log.controller';
import { HttpLogService } from './http-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpLogEntity } from '@http-log/http-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HttpLogEntity])],
  controllers: [HttpLogController],
  providers: [HttpLogService],
  exports: [HttpLogService],
})
export class HttpLogModule {}
