import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HttpLog } from '@http-log/http-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class HttpLogService {
  constructor(
    @InjectRepository(HttpLog)
    private readonly logRepository: Repository<HttpLog>,
  ) {}

  create(httpLog: HttpLog) {
    return this.logRepository.save(httpLog);
  }

  findAll(options: IPaginationOptions) {
    return paginate<HttpLog>(this.logRepository, options);
  }

  delete(id: string) {
    return this.logRepository.delete(id);
  }
}
