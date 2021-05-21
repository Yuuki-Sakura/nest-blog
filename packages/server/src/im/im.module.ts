import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IMGroup } from '@im/entities/group.entity';
import { IMGroupMessage } from '@im/entities/groupMessage.entity';
import { IMAnnouncement } from '@im/entities/announcement.entity';
import { IMFriend } from '@im/entities/friend.entity';
import { IMMessage } from '@im/entities/message.entity';
import { IMRequest } from '@im/entities/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IMGroup,
      IMGroupMessage,
      IMAnnouncement,
      IMFriend,
      IMMessage,
      IMRequest,
    ]),
  ],
  providers: [],
  exports: [],
})
export class ImModule {}
