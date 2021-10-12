import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookMapper } from './dto/bookMapper';
import { User } from '../user/user.entity';
import { Borrow } from "../borrow/borrow.entity";
import { UserService } from "../user/user.service";
import { UserMapper } from "../user/dto/user.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrow, User])],
  controllers: [BookController],
  providers: [BookService, BookMapper, UserService, UserMapper],
  exports: [TypeOrmModule],
})
export class BookModule {}
