import { IMBaseEntity } from '@im/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { IMGroup } from '@im/entities/group.entity';
import {
  createUnionType,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum IMRequestStatus {
  Sent,
  Confirmed,
}

export enum IMRequestType {
  Friend,
  Group,
}

const IMRequestTargetUnion = createUnionType({
  name: 'IMRequestTargetUnion',
  types: () => [UserEntity, IMGroup],
});

registerEnumType(IMRequestStatus, {
  name: 'IMRequestStatus',
});
registerEnumType(IMRequestType, {
  name: 'IMRequestType',
});

@Entity('im_request')
@ObjectType()
export class IMRequest extends IMBaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.requests, { nullable: false })
  from: UserEntity;

  @Field(() => IMRequestType)
  @Column('simple-enum', { enum: IMRequestType, comment: '验证消息类型' })
  type: IMRequestType;

  @Field(() => IMRequestStatus)
  @Column('simple-enum', { enum: IMRequestStatus, comment: '验证消息状态' })
  status: IMRequestStatus;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity)
  confirmedBy: UserEntity;

  @Field(() => IMRequestTargetUnion)
  target: UserEntity | IMGroup;

  @ManyToOne(() => UserEntity, (user) => user.addRequests, { nullable: true })
  toUser?: UserEntity;

  @ManyToOne(() => IMGroup, (group) => group.joinRequests, { nullable: true })
  toGroup?: IMGroup;
}
