import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500, default: null })
  avatar: string; // 头像

  @IsEmail()
  @Column({ length: 500, default: null })
  email: string; // 邮箱

  @Column('simple-enum', { enum: ['banned', 'active'], default: 'active' })
  status: string; // 用户状态

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updated: Date;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
