import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { IMAnnouncement } from '@im/entities/announcement.entity';
import { IMGroupMessage } from '@im/entities/groupMessage.entity';
import { IMBaseEntity } from '@im/entities/base.entity';
import { IMRequest } from '@im/entities/request.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('im_group')
@ObjectType()
export class IMGroup extends IMBaseEntity {
  @Field()
  @Column({ comment: '群组名' })
  name: string;

  @Field(() => [IMAnnouncement])
  @OneToMany(() => IMAnnouncement, (announcement) => announcement.group)
  announcements: IMAnnouncement[];

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.imOwnGroups)
  owner: UserEntity;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity)
  @JoinTable()
  administrators: UserEntity[];

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (member) => member.imJoinGroups)
  @JoinTable()
  members: UserEntity[];

  @Field(() => [IMGroupMessage])
  @OneToMany(() => IMGroupMessage, (message) => message.group)
  messages: IMGroupMessage[];

  @Field(() => [IMRequest])
  @OneToMany(() => IMRequest, (request) => request.toGroup)
  joinRequests: IMRequest[];
}
