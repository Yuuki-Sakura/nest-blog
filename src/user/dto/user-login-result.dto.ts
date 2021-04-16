import { Role } from '@role/role.entity';
import { ArticleEntity } from '@article/article.entity';
import { Timestamp } from '@shared/decorator/timestamp.decorator';

export class UserLoginResultDto {
  articles: ArticleEntity[];
  avatar: string;
  birthday: Date;
  @Timestamp()
  createTime: Date;
  email: string;
  gender: number;
  id: string;
  @Timestamp()
  loginTime: Date;
  phone: string;
  roles: Role[];
  status: number;
  @Timestamp()
  updateTime: Date;
  username: string;
}
