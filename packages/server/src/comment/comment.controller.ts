import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CommentService } from '@comment/comment.service';
import { Auth, ContentProtect } from '@auth/auth.utils';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Delete(':id')
  @ContentProtect(['comments', 'articles'], 'comment.delete', '删除评论')
  deleteComment(@Param('id') id: string) {
    return this.commentService.softDelete(id);
  }

  @Get()
  @Auth('comment.query', '获取所有评论')
  findAll() {
    return this.commentService.find();
  }
}
