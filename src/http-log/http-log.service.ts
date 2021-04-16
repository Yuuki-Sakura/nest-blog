import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HttpLogEntity } from '@http-log/http-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class HttpLogService {
  constructor(
    @InjectRepository(HttpLogEntity)
    private readonly logRepository: Repository<HttpLogEntity>,
  ) {}

  create(httpLog: HttpLogEntity) {
    return this.logRepository.save(httpLog);
  }

  findAll(options: IPaginationOptions) {
    return paginate<HttpLogEntity>(this.logRepository, options);
  }
}
