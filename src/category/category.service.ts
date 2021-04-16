import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@category/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: Repository<CategoryEntity>) {}
}
