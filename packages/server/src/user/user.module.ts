import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '@user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '@role/role.module';
import { ArticleModule } from '@article/article.module';
import { CommentModule } from '@comment/comment.module';
import { UserResolver } from '@user/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    RoleModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
