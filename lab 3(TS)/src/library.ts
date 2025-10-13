// src/library.ts

export class Library<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(predicate: (item: T) => boolean): void {
    this.items = this.items.filter((i) => !predicate(i));
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  getAll(): T[] {
    return this.items;
  }
}
