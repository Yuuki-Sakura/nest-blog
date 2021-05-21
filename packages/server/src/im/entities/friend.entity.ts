import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from '@user/user.entity';
import { IMBaseEntity } from '@im/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('im_friend')
export class IMFriend extends IMBaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.friends)
  @JoinColumn()
  user: UserEntity;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity)
  @JoinColumn()
  friend: UserEntity;

  @Field()
  @Column({ comment: '好友备注' })
  comment: string;
}
