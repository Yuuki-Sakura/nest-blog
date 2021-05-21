import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@comment/comment.entity';
import { FindConditions } from 'typeorm/find-options/FindConditions';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  softDelete(comment: Comment);
  softDelete(id: string);
  softDelete(id: string | Comment) {
    return this.commentRepository.softDelete(id);
  }

  async find(conditions?: FindConditions<Comment>) {
    return this.commentRepository.find(conditions);
  }
}
