import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from '@tag/tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tagService.findById(id);
  }
}
