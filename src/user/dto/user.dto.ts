import { BaseEntity } from '@shared/entity/base.entity';

export class UserDto implements BaseEntity {
  createDate: Date;
  id: string;
  updateDate: Date;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  loginDate: Date;
}
