import { Injectable } from '@nestjs/common';
import { Book } from '../book.entity';
import { DtoBook } from './dtoBook';

@Injectable()
export class BookMapper {
  toDto(books: Book[]): DtoBook[] {
    const dtoBooks: DtoBook[] = [];
    for (const book of books) {
      const categoriesId = book.categories.map((category) => category.id);
      dtoBooks.push(
        new DtoBook(
          book.id,
          book.title,
          book.coverUrl,
          book.publishedYear,
          categoriesId,
        ),
      );
    }
    return dtoBooks;
  }
}
