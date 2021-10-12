import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from "./entities/category/category.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Category[]> {
    return this.appService.getHello();
  }
}
