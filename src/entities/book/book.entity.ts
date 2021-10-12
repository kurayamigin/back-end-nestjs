import { Category } from '../category/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'cover_url', nullable: true })
  coverUrl?: string | null;

  @Column({ name: 'published_year', nullable: true })
  publishedYear: number | null;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories?: Category[] | null;

  @Column({ nullable: true })
  synopsis?: string;
}
