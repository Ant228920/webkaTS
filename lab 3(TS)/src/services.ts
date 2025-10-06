// src/services.ts
import { Book, User } from "./models";
import { Library } from "./library";

export class LibraryService {
    private books: Library<Book>;
    private users: Library<User>;

    constructor() {
        this.books = new Library<Book>();
        this.users = new Library<User>();
    }

    // ===== КНИГИ =====
    addBook(book: Book): void {
        this.books.add(book);
    }

    getBooks(): Book[] {
        return this.books.getAll();
    }

    findBookById(id: number): Book | undefined {
        return this.books.find(b => b.id === id);
    }

    removeBook(id: number): void {
        this.books.remove(b => b.id === id);
    }

    // ===== КОРИСТУВАЧІ =====
    addUser(user: User): void {
        this.users.add(user);
    }

    getUsers(): User[] {
        return this.users.getAll();
    }

    findUserById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }

    removeUser(id: number): void {
        this.users.remove(u => u.id === id);
    }

    // ===== ПОЗИЧАННЯ / ПОВЕРНЕННЯ =====
    borrowBook(userId: number, bookId: number): string {
        const user = this.findUserById(userId);
        const book = this.findBookById(bookId);

        if (!user || !book) return "❌ Користувача або книги не знайдено";
        if (book.isBorrowed) return "❌ Книга вже позичена";
        if (user.borrowedBooks.length >= 3) return "❌ Користувач не може брати більше 3 книг";

        user.borrowBook(book.id);
        book.borrow();
        return "✅ Книга успішно позичена";
    }

    returnBook(userId: number, bookId: number): string {
        const user = this.findUserById(userId);
        const book = this.findBookById(bookId);

        if (!user || !book) return "❌ Користувача або книги не знайдено";
        if (!user.borrowedBooks.includes(book.id)) return "❌ У цього користувача ця книга не позичена";

        user.returnBook(book.id);
        book.returnBook();
        return "✅ Книга успішно повернена";
    }
}
