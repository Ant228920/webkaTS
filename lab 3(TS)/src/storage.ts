// src/storageService.ts
export class StorageService<T> {
  constructor(private key: string) {}

  save(data: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  load(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
