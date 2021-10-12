import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { BorrowBookBean } from './dto/borrow-book.bean';
import { CustomResponse } from '../../shared/custom-responde.model';
import { ResponseCodes } from '../../enums/responses-code.enum';
import { UserService } from '../user/user.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService, private readonly userService: UserService) {}

  @Get('/byCategories')
  findByCategoriesId(@Query('categoriesId') categoriesId: any[]) {
    categoriesId = categoriesId.map((cat) => parseInt(String(cat)));
    console.log('params are ', categoriesId);
    return this.bookService.findByCategoriesId(categoriesId);
  }

  @Get('/details/:id')
  get(@Param('id') id: number) {
    return this.bookService.withDetails(id);
  }

  @Post('/borrow')
  async borrow(@Body('data') data: BorrowBookBean) {
    const user = await this.userService.findOne({ username: data.username });
    const book = await this.bookService.findOne({ id: data.bookId });
    const borrowed = await this.bookService.findBorrow(user, book);
    if (borrowed)
      return new CustomResponse(
        borrowed,
        ResponseCodes.INVALID_DATA,
        'Already borrowed by ' + data.username,
      );

    const borrow = await this.bookService.borrow(user, book, data.datetime);
    return new CustomResponse(borrow, ResponseCodes.SUCCESS, 'borrowed!');
  }
}
