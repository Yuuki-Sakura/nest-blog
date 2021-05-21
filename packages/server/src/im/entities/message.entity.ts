import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { IMBaseEntity } from '@im/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('im_message')
@ObjectType()
export class IMMessage extends IMBaseEntity {
  @Field()
  @Column('mediumtext', { comment: '消息内容' })
  body: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  from: UserEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  to: UserEntity;
}
