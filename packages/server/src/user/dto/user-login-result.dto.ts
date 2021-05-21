import { UserEntity } from '@user/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserLoginResult')
export class UserLoginResultDto extends UserEntity {
  @Field()
  token: string;
}
