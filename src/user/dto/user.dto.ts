import { BaseEntity } from '@shared/entity/base.entity';

export class UserDto implements BaseEntity {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}
