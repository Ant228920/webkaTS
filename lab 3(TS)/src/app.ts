import { Book, User } from './models';
import { LibraryService } from './services';
import { StorageService } from './storage';
import { validateYear, validateUserId, validateNotEmpty } from './validation';
import { showMessage } from './modal';
import { ModalWindow } from './modal';

const service = new LibraryService();
const bookStorage = new StorageService<Book>('books');
const userStorage = new StorageService<User>('users');

const bookList = document.getElementById('bookList') as HTMLElement;
const userList = document.getElementById('userList') as HTMLElement;

let selectedBook: Book | null = null;
let borrowModal: ModalWindow;

document.addEventListener('DOMContentLoaded', () => {
  borrowModal = new ModalWindow('borrowModal', 'confirmBorrow', 'closeBorrowModal');

  bookStorage
    .load()
    .forEach((b) => service.addBook(new Book(b.id, b.title, b.author, b.year, b.isBorrowed)));

  userStorage.load().forEach((u) => {
    const user = new User(u.id, u.name);
    user.borrowedBooks = u.borrowedBooks;
    service.addUser(user);
  });

  renderBooks();
  renderUsers();
});

document.getElementById('bookForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = (document.getElementById('title') as HTMLInputElement).value.trim();
  const author = (document.getElementById('author') as HTMLInputElement).value.trim();
  const year = (document.getElementById('year') as HTMLInputElement).value.trim();

  if (!validateNotEmpty(title) || !validateNotEmpty(author) || !validateYear(year)) {
    showMessage('❌ Некоректні дані!');
    return;
  }

  const existingBook = service
    .getBooks()
    .find(
      (b) =>
        b.title.toLowerCase() === title.toLowerCase() &&
        b.author.toLowerCase() === author.toLowerCase() &&
        b.year === parseInt(year)
    );

  if (existingBook) {
    showMessage('❌ Така книга вже існує!', 'error');
    return;
  }

  const book = new Book(Date.now(), title, author, parseInt(year));
  service.addBook(book);
  bookStorage.save(service.getBooks());

  showMessage('✅ Книга додана!');
  renderBooks();
  (e.target as HTMLFormElement).reset();
});

document.getElementById('userForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = (document.getElementById('userId') as HTMLInputElement).value.trim();
  const name = (document.getElementById('userName') as HTMLInputElement).value.trim();

  if (!validateUserId(id) || !validateNotEmpty(name)) {
    showMessage('❌ Некоректні дані!', 'error');
    return;
  }

  const existingUser = service.getUsers().find((u) => u.id === parseInt(id));
  if (existingUser) {
    showMessage('❌ Користувач з таким ID вже існує!', 'error');
    return;
  }

  const user = new User(parseInt(id), name);
  service.addUser(user);
  userStorage.save(service.getUsers());

  showMessage('✅ Користувач доданий!');
  renderUsers();
  (e.target as HTMLFormElement).reset();
});

function showBorrowModal(book: Book) {
  selectedBook = book;

  const titleElement = document.getElementById('borrowBookTitle');
  if (titleElement) titleElement.textContent = `Книга: ${book.title}`;

  borrowModal.show(() => {
    borrowBook();
  });
}

function borrowBook() {
  if (!selectedBook) return;

  const userIdInput = document.getElementById('modalUserId') as HTMLInputElement;
  const userId = parseInt(userIdInput.value);

  if (!userId || isNaN(userId)) {
    userIdInput.classList.add('is-invalid');
    showMessage('❌ Введіть коректний ID користувача!', 'error');
    return;
  }

  userIdInput.classList.remove('is-invalid');

  const msg = service.borrowBook(userId, selectedBook.id);
  bookStorage.save(service.getBooks());
  userStorage.save(service.getUsers());

  showMessage(msg, msg.startsWith('✅') ? 'success' : 'error');
  borrowModal.hide();
  userIdInput.value = '';
  selectedBook = null;
  renderBooks();
  renderUsers();
}

function renderBooks(): void {
  bookList.innerHTML = '';
  service.getBooks().forEach((book) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const bookInfo = document.createElement('span');
    bookInfo.textContent = `${book.title} (${book.year}) — ${book.author} [${book.isBorrowed ? 'Взята' : 'Доступна'}]`;
    li.appendChild(bookInfo);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'btn-group';

    const borrowBtn = document.createElement('button');
    borrowBtn.className = `btn btn-sm ${book.isBorrowed ? 'btn-success' : 'btn-warning'}`;
    borrowBtn.textContent = book.isBorrowed ? 'Повернути' : 'Позичити';

    if (book.isBorrowed) {
      borrowBtn.addEventListener('click', () => {
        const borrower = service.getUsers().find((u) => u.borrowedBooks.includes(book.id));
        if (!borrower) {
          showMessage('❌ Неможливо знайти користувача, який позичив цю книгу!', 'error');
          return;
        }

        const msg = service.returnBook(borrower.id, book.id);
        console.log('Результат повернення:', msg);

        bookStorage.save(service.getBooks());
        userStorage.save(service.getUsers());
        showMessage(msg, msg.startsWith('✅') ? 'success' : 'error');

        renderBooks();
        renderUsers();
      });
    } else {
      borrowBtn.addEventListener('click', () => showBorrowModal(book));
    }
    buttonGroup.appendChild(borrowBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.textContent = 'Видалити';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Ви впевнені, що хочете видалити книгу "${book.title}"?`)) {
        service.removeBook(book.id);
        bookStorage.save(service.getBooks());
        showMessage('✅ Книга видалена!');
        renderBooks();
      }
    });
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(buttonGroup);
    bookList.appendChild(li);
  });
}

function renderUsers(): void {
  userList.innerHTML = '';
  service.getUsers().forEach((user) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const userInfo = document.createElement('span');
    userInfo.textContent = `ID: ${user.id}, Ім'я: ${user.name}, Книг: ${user.borrowedBooks.length}`;
    li.appendChild(userInfo);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.textContent = 'Видалити';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (user.borrowedBooks.length > 0) {
        showMessage('❌ Неможливо видалити користувача, який має позичені книги!', 'error');
        return;
      }
      if (confirm(`Ви впевнені, що хочете видалити користувача "${user.name}"?`)) {
        service.removeUser(user.id);
        userStorage.save(service.getUsers());
        showMessage('✅ Користувач видалений!');
        renderUsers();
      }
    });
    li.appendChild(deleteBtn);

    userList.appendChild(li);
  });
}
