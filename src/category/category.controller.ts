import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from '@category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoryService.findArticleById(id);
  }
}
