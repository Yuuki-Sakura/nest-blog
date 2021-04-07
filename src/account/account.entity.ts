import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '@app/shared/entity/base.entity';
import { Role } from '@app/role/role.entity';
import { Exclude } from 'class-transformer';

@Entity('account')
export class AccountEntity extends BaseEntity {
  @Column({ length: 500, comment: '用户名', unique: true })
  username: string;

  @IsEmail()
  @Column({ length: 50, comment: '邮箱', unique: true })
  email: string;

  @Column({ comment: '手机号', nullable: true, unique: true })
  phone: string;

  @Exclude()
  @Column({ length: 256, comment: '密码' })
  password: string;

  @Column({ length: 500, nullable: true, default: null, comment: '头像' })
  avatar: string;

  @Column('simple-enum', {
    enum: ['banned', 'active'],
    default: 'active',
    comment: '用户状态',
  })
  status: string;

  @Column('date', { comment: '登陆时间', nullable: true })
  loginDate: Date;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
