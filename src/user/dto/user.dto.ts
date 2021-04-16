import { BaseEntity } from '@shared/entity/base.entity';

export class UserDto implements BaseEntity {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  createTime: Date;
  updateTime: Date;
}
