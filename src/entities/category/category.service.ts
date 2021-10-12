import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });
  }
}
