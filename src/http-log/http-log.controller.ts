import { Controller, Get, Query } from '@nestjs/common';
import { HttpLogService } from '@http-log/http-log.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { HttpLogEntity } from '@http-log/http-log.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from '@shared/classes/pagination-options';

@Controller('http-log')
@ApiTags('请求日志')
export class HttpLogController {
  constructor(private readonly logService: HttpLogService) {}

  @Get()
  @ApiQuery({
    style: 'form',
    type: PaginationOptions,
  })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<HttpLogEntity>> {
    return this.logService.findAll({
      page,
      limit,
    });
  }
}
