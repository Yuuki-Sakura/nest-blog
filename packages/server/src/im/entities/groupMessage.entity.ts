import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { IMGroup } from '@im/entities/group.entity';
import { IMBaseEntity } from '@im/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('im_group_message')
@ObjectType()
export class IMGroupMessage extends IMBaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  from: UserEntity;

  @Field()
  @Column('mediumtext', { comment: '消息内容' })
  body: string;

  @Field(() => IMGroup)
  @ManyToOne(() => IMGroup, (group) => group.messages)
  group: IMGroup;
}
