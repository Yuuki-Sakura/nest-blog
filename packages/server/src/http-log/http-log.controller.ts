import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { HttpLogService } from '@http-log/http-log.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { HttpLog } from '@http-log/http-log.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from '@shared/classes/pagination-options';
import { Auth } from '@auth/auth.utils';

@Controller('http-log')
@ApiTags('请求日志')
export class HttpLogController {
  constructor(private readonly logService: HttpLogService) {}

  @Get()
  @Auth('http-log.query', '获取日志')
  @ApiQuery({
    style: 'form',
    type: PaginationOptions,
  })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<HttpLog>> {
    return this.logService.findAll({
      page,
      limit,
    });
  }

  @Delete(':id')
  @Auth('http-log.delete', '删除日志')
  delete(@Param('id') id: string) {
    return this.logService.delete(id);
  }
}
