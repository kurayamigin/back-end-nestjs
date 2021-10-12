import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoBook } from './dto/dtoBook';
import { BookMapper } from './dto/bookMapper';
import { Borrow } from '../borrow/borrow.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Borrow) private borrowRespository: Repository<Borrow>,
    private readonly bookMapper: BookMapper,
  ) {}

  async findByCategoriesId(ids: any[]): Promise<DtoBook[]> {
    const books = await this.bookRepository
      .createQueryBuilder('bookscategories')
      .select('book')
      .from(Book, 'book')
      .leftJoinAndSelect('book.categories', 'category')
      .where('category.id IN (:...ids)', { ids: ids })
      .getMany();
    return this.bookMapper.toDto(books);
  }

  async withDetails(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id: id },
      relations: ['categories'],
    });
    book['categoriesName'] = [];
    for (const category of book.categories) {
      book['categoriesName'].push(category.name);
    }
    return book;
  }

  async findBorrow(user: User, book: Book) {
    return this.borrowRespository.findOne({ user: user, book: book });
  }

  async borrow(user: User, book: Book, date: Date) {
    //validation
    return await this.borrowRespository.save({
      user: user,
      book: book,
      datetime: date,
    });
  }

  findOne(options) {
    return this.bookRepository.findOne(options);
  }
}
