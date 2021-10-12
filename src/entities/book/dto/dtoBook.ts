import { Exclude } from 'class-transformer';

@Exclude()
export class DtoBook {
  readonly id: number;

  readonly title: string;

  readonly coverUrl: string;

  readonly publishedYear: number;

  readonly categoriesIds: number[];

  readonly synopsis?: string;
  constructor(
    id: number,
    title: string,
    coverUrl: string,
    publishedYear: number,
    categoriesIds: number[],
  ) {
    this.id = id;
    this.title = title;
    this.coverUrl = coverUrl;
    this.publishedYear = publishedYear;
    this.categoriesIds = categoriesIds;
  }
}
