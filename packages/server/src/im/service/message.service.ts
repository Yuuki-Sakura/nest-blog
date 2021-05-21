import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IMMessage } from '@im/entities/message.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class IMMessageService {
  constructor(
    private readonly messageRepository: Repository<IMMessage>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
}
