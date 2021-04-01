import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '@app/shared/entity/base.entity';

@Entity('user')
export class AccountEntity extends BaseEntity {
  @Column({ length: 500 })
  username: string;

  @IsEmail()
  @Column({ length: 500, default: null })
  email: string; // 邮箱

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500, default: null })
  avatar: string; // 头像

  @Column('simple-enum', { enum: ['banned', 'active'], default: 'active' })
  status: string; // 用户状态

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
