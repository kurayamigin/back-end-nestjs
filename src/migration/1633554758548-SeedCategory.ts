import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { BookSeed } from '../seeds/book.seed';
import { CategorySeed } from '../seeds/categories.seed';

export class SeedCategory1633554758548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('category').save(CategorySeed);
    await getRepository('book').save(BookSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
