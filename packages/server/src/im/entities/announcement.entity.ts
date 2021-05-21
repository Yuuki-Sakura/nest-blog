import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { IMGroup } from '@im/entities/group.entity';
import { IMBaseEntity } from '@im/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('im_announcement')
export class IMAnnouncement extends IMBaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.announcements)
  author: UserEntity;

  @Field()
  @Column('mediumtext', { comment: '群公告内容' })
  body: string;

  @Field(() => IMGroup)
  @ManyToOne(() => IMGroup, (group) => group.announcements)
  group: IMGroup;
}
