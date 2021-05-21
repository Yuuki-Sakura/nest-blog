import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@comment/comment.entity';
import { RoleModule } from '@role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), RoleModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
