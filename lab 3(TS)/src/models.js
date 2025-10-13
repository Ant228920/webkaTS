'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = exports.Book = void 0;
var Book = /** @class */ (function () {
  function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.taken = false;
  }
  Book.prototype.getTitle = function () {
    return this.title;
  };
  Book.prototype.getAuthor = function () {
    return this.author;
  };
  Book.prototype.getYear = function () {
    return this.year;
  };
  Book.prototype.isTaken = function () {
    return this.taken;
  };
  Book.prototype.takeBook = function () {
    this.taken = true;
  };
  Book.prototype.returnBook = function () {
    this.taken = false;
  };
  return Book;
})();
exports.Book = Book;
var User = /** @class */ (function () {
  function User(id, name) {
    this.id = id;
    this.name = name;
    this.books = [];
  }
  User.prototype.getId = function () {
    return this.id;
  };
  User.prototype.getName = function () {
    return this.name;
  };
  User.prototype.getBooks = function () {
    return this.books;
  };
  User.prototype.addBook = function (book) {
    if (this.books.length >= 3) {
      throw new Error('Користувач не може мати більше 3 книг!');
    }
    if (book.isTaken()) {
      throw new Error('Книга вже зайнята іншим користувачем!');
    }
    book.takeBook();
    this.books.push(book);
  };
  User.prototype.returnBook = function (book) {
    this.books = this.books.filter(function (b) {
      return b !== book;
    });
    book.returnBook();
  };
  return User;
})();
exports.User = User;
