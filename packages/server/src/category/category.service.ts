import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '@category/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
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
