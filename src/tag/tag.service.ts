import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '@tag/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly repository: Repository<Tag>,
  ) {}

  findByIds(ids: string[]) {
    return this.repository.findByIds(ids);
  }
}
