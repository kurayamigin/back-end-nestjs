import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './entities/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './entities/category/category.service';
import { CategoryModule } from './entities/category/category.module';
import { UserModule } from './entities/user/user.module';
import { SessionModule } from './entities/session/session.module';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot(),
    CategoryModule,
    UserModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
