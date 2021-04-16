import { Controller } from '@nestjs/common';
import { TagService } from '@tag/tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
}
