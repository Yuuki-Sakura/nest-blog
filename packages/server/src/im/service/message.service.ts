import { Injectable } from '@nestjs/common';
import { IMMessage } from '@im/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IMMessageService {
  constructor(private readonly messageRepository: Repository<IMMessage>) {}
}
