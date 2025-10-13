'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var models_js_1 = require('./models.js');
var library_js_1 = require('./library.js');
var storage_js_1 = require('./storage.js');
// створюємо бібліотеку і сховище
var library = new library_js_1.Library();
var storage = new storage_js_1.StorageService('books');
// при завантаженні сторінки — підтягуємо дані з LocalStorage
window.addEventListener('DOMContentLoaded', function () {
  var saved = storage.load();
  saved.forEach(function (b) {
    return library.add(new models_js_1.Book(b.title, b.author, b.year));
  });
  renderBooks();
});
// форма
var form = document.getElementById('book-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var title = document.getElementById('title').value;
  var author = document.getElementById('author').value;
  var year = parseInt(document.getElementById('year').value);
  var book = new models_js_1.Book(title, author, year);
  library.add(book);
  // зберігаємо у localStorage
  storage.save(library.getAll());
  // перерендеримо таблицю
  renderBooks();
  form.reset();
});
// функція рендера таблиці
function renderBooks() {
  var tbody = document.querySelector('#books-table tbody');
  tbody.innerHTML = '';
  library.getAll().forEach(function (book, index) {
    var row = document.createElement('tr');
    row.innerHTML = '\n            <td>'
      .concat(index + 1, '</td>\n            <td>')
      .concat(book.getTitle(), '</td>\n            <td>')
      .concat(book.getAuthor(), '</td>\n            <td>')
      .concat(
        book.getYear(),
        '</td>\n            <td>\n                <button class="btn btn-danger btn-sm">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n            </td>\n        ',
      );
    // кнопка видалення
    row.querySelector('button').addEventListener('click', function () {
      library.remove(book);
      storage.save(library.getAll());
      renderBooks();
    });
    tbody.appendChild(row);
  });
}
