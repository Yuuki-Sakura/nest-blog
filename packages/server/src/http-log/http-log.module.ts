import { Module } from '@nestjs/common';
import { HttpLogController } from './http-log.controller';
import { HttpLogService } from './http-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpLog } from '@http-log/http-log.entity';
import { RoleModule } from '@role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([HttpLog]), RoleModule],
  controllers: [HttpLogController],
  providers: [HttpLogService],
  exports: [HttpLogService],
})
export class HttpLogModule {}
