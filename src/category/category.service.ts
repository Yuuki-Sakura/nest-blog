import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@category/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findArticleById(id: string) {
    return (await this.repository.findOne({ id })).articles;
  }

  async findById(id: string) {
    return this.repository.findOne({ id });
  }
}
