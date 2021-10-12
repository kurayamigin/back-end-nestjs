import { Category } from '../category/category.entity';
import {
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { User } from '../user/user.entity';
import { Book } from '../book/book.entity';

@Unique(['user', 'book'])
@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  book: Book;

  @Column({ nullable: true })
  datetime: Date;
}
