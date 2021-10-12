import { Injectable } from '@nestjs/common';
import { CategoryService } from './entities/category/category.service';
import { Category } from './entities/category/category.entity';

@Injectable()
export class AppService {
  constructor(private categoryService: CategoryService) {}
  getHello(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
