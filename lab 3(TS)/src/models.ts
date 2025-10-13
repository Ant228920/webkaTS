// src/models.ts

// Інтерфейси
export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
}

export interface IUser {
  id: number;
  name: string;
  borrowedBooks: number[];
}

// Класи
export class Book implements IBook {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public year: number,
    public isBorrowed: boolean = false,
  ) {}

  borrow(): void {
    this.isBorrowed = true;
  }

  returnBook(): void {
    this.isBorrowed = false;
  }
}

export class User implements IUser {
  borrowedBooks: number[] = [];

  constructor(
    public id: number,
    public name: string,
  ) {}

  borrowBook(bookId: number): void {
    if (this.borrowedBooks.length >= 3) {
      throw new Error('Користувач не може брати більше 3 книг');
    }
    this.borrowedBooks.push(bookId);
  }

  returnBook(bookId: number): void {
    this.borrowedBooks = this.borrowedBooks.filter((id) => id !== bookId);
  }
}
