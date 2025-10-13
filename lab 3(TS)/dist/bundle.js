/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './src/app.ts':
      /*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ "./src/models.ts");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.ts");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.ts");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation */ "./src/validation.ts");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal */ "./src/modal.ts");\n\n\n\n\n\n\nconst service = new _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService();\nconst bookStorage = new _storage__WEBPACK_IMPORTED_MODULE_2__.StorageService("books");\nconst userStorage = new _storage__WEBPACK_IMPORTED_MODULE_2__.StorageService("users");\nconst bookList = document.getElementById("bookList");\nconst userList = document.getElementById("userList");\nlet selectedBook = null;\nlet borrowModal;\ndocument.addEventListener("DOMContentLoaded", () => {\n    borrowModal = new _modal__WEBPACK_IMPORTED_MODULE_4__.ModalWindow("borrowModal", "confirmBorrow", "closeBorrowModal");\n});\nbookStorage.load().forEach(b => service.addBook(new _models__WEBPACK_IMPORTED_MODULE_0__.Book(b.id, b.title, b.author, b.year, b.isBorrowed)));\nuserStorage.load().forEach(u => {\n    const user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(u.id, u.name);\n    user.borrowedBooks = u.borrowedBooks;\n    service.addUser(user);\n});\nrenderBooks();\nrenderUsers();\ndocument.getElementById("bookForm")?.addEventListener("submit", e => {\n    e.preventDefault();\n    const title = document.getElementById("title").value;\n    const author = document.getElementById("author").value;\n    const year = document.getElementById("year").value;\n    if (!(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateNotEmpty)(title) || !(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateYear)(year)) {\n        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("❌ Некоректні дані!", "error");\n        return;\n    }\n    const existingBook = service.getBooks().find(b => b.title.toLowerCase() === title.toLowerCase() &&\n        b.author.toLowerCase() === author.toLowerCase() &&\n        b.year === parseInt(year));\n    if (existingBook) {\n        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("❌ Така книга вже існує!", "error");\n        return;\n    }\n    const book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book(Date.now(), title, author, parseInt(year));\n    service.addBook(book);\n    bookStorage.save(service.getBooks());\n    (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("✅ Книга додана!");\n    renderBooks();\n    e.target.reset();\n});\ndocument.getElementById("userForm")?.addEventListener("submit", e => {\n    e.preventDefault();\n    const id = document.getElementById("userId").value;\n    const name = document.getElementById("userName").value;\n    if (!(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateUserId)(id) || !(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateNotEmpty)(name)) {\n        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("❌ Некоректні дані!", "error");\n        return;\n    }\n    const existingUser = service.getUsers().find(u => u.id === parseInt(id));\n    if (existingUser) {\n        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("❌ Користувач з таким ID вже існує!", "error");\n        return;\n    }\n    const user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(parseInt(id), name);\n    service.addUser(user);\n    userStorage.save(service.getUsers());\n    (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("✅ Користувач доданий!");\n    renderUsers();\n    e.target.reset();\n});\nfunction showBorrowModal(book) {\n    selectedBook = book;\n    const titleElement = document.getElementById("borrowBookTitle");\n    if (titleElement) {\n        titleElement.textContent = `Книга: ${book.title}`;\n    }\n    borrowModal.show(() => {\n        borrowBook();\n    });\n}\nfunction borrowBook() {\n    if (!selectedBook)\n        return;\n    const userIdInput = document.getElementById("modalUserId");\n    const userId = parseInt(userIdInput.value);\n    if (!userId || isNaN(userId)) {\n        userIdInput.classList.add("is-invalid");\n        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("❌ Введіть коректний ID користувача!", "error");\n        return;\n    }\n    userIdInput.classList.remove("is-invalid");\n    const msg = service.borrowBook(userId, selectedBook.id);\n    bookStorage.save(service.getBooks());\n    userStorage.save(service.getUsers());\n    (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)(msg, msg.startsWith("✅") ? "success" : "error");\n    borrowModal.hide();\n    userIdInput.value = "";\n    selectedBook = null;\n    renderBooks();\n    renderUsers();\n}\nfunction renderBooks() {\n    bookList.innerHTML = "";\n    service.getBooks().forEach(book => {\n        const li = document.createElement("li");\n        li.className = "list-group-item d-flex justify-content-between align-items-center";\n        const bookInfo = document.createElement("span");\n        bookInfo.textContent = `${book.title} (${book.year}) — ${book.author} [${book.isBorrowed ? "Взята" : "Доступна"}]`;\n        li.appendChild(bookInfo);\n        const buttonGroup = document.createElement("div");\n        buttonGroup.className = "btn-group";\n        const borrowBtn = document.createElement("button");\n        borrowBtn.className = `btn btn-sm ${book.isBorrowed ? "btn-secondary" : "btn-warning"}`;\n        borrowBtn.textContent = "Позичити";\n        borrowBtn.disabled = book.isBorrowed;\n        borrowBtn.addEventListener("click", () => {\n            showBorrowModal(book);\n        });\n        buttonGroup.appendChild(borrowBtn);\n        const deleteBtn = document.createElement("button");\n        deleteBtn.className = "btn btn-sm btn-danger";\n        deleteBtn.textContent = "Видалити";\n        deleteBtn.addEventListener("click", (e) => {\n            e.stopPropagation();\n            if (confirm(`Ви впевнені, що хочете видалити книгу "${book.title}"?`)) {\n                service.removeBook(book.id);\n                bookStorage.save(service.getBooks());\n                (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("✅ Книга видалена!");\n                renderBooks();\n            }\n        });\n        buttonGroup.appendChild(deleteBtn);\n        li.appendChild(buttonGroup);\n        bookList.appendChild(li);\n    });\n}\nfunction renderUsers() {\n    userList.innerHTML = "";\n    service.getUsers().forEach(user => {\n        const li = document.createElement("li");\n        li.className = "list-group-item d-flex justify-content-between align-items-center";\n        const userInfo = document.createElement("span");\n        userInfo.textContent = `ID: ${user.id}, Ім\'я: ${user.name}, Книг: ${user.borrowedBooks.length}`;\n        li.appendChild(userInfo);\n        const deleteBtn = document.createElement("button");\n        deleteBtn.className = "btn btn-sm btn-danger";\n        deleteBtn.textContent = "Видалити";\n        deleteBtn.addEventListener("click", (e) => {\n            e.stopPropagation();\n            if (user.borrowedBooks.length > 0) {\n                (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("❌ Неможливо видалити користувача, який має позичені книги!", "error");\n                return;\n            }\n            if (confirm(`Ви впевнені, що хочете видалити користувача "${user.name}"?`)) {\n                service.removeUser(user.id);\n                userStorage.save(service.getUsers());\n                (0,_modal__WEBPACK_IMPORTED_MODULE_4__.showMessage)("✅ Користувач видалений!");\n                renderUsers();\n            }\n        });\n        li.appendChild(deleteBtn);\n        userList.appendChild(li);\n    });\n}\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?\n}',
        );

        /***/
      },

    /***/ './src/library.ts':
      /*!************************!*\
  !*** ./src/library.ts ***!
  \************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Library: () => (/* binding */ Library)\n/* harmony export */ });\n// src/library.ts\nclass Library {\n    constructor() {\n        this.items = [];\n    }\n    add(item) {\n        this.items.push(item);\n    }\n    remove(predicate) {\n        this.items = this.items.filter(i => !predicate(i));\n    }\n    find(predicate) {\n        return this.items.find(predicate);\n    }\n    getAll() {\n        return this.items;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/library.ts?\n}',
        );

        /***/
      },

    /***/ './src/modal.ts':
      /*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModalWindow: () => (/* binding */ ModalWindow),\n/* harmony export */   showMessage: () => (/* binding */ showMessage)\n/* harmony export */ });\n// src/modal.ts\nfunction showMessage(message, type = "success") {\n    const modal = document.createElement("div");\n    modal.className = `alert alert-${type === "success" ? "success" : "danger"} mt-2`;\n    modal.textContent = message;\n    document.body.prepend(modal);\n    setTimeout(() => modal.remove(), 3000);\n}\nclass ModalWindow {\n    constructor(modalId, confirmButtonId, closeButtonClass) {\n        this.onConfirmCallback = null;\n        this.modalElement = document.getElementById(modalId);\n        this.confirmButton = document.getElementById(confirmButtonId);\n        this.closeButtons = document.querySelectorAll(`.${closeButtonClass}`);\n        this.init();\n    }\n    init() {\n        // Ініціалізація Bootstrap Modal\n        if (window.bootstrap) {\n            this.modalInstance = new window.bootstrap.Modal(this.modalElement);\n        }\n        // Обробник підтвердження\n        this.confirmButton.addEventListener(\'click\', () => {\n            if (this.onConfirmCallback) {\n                this.onConfirmCallback();\n            }\n        });\n        // Обробники закриття\n        this.closeButtons.forEach(btn => {\n            btn.addEventListener(\'click\', () => {\n                this.hide();\n            });\n        });\n    }\n    show(onConfirm) {\n        this.onConfirmCallback = onConfirm;\n        if (this.modalInstance) {\n            this.modalInstance.show();\n        }\n    }\n    hide() {\n        if (this.modalInstance) {\n            this.modalInstance.hide();\n        }\n        this.onConfirmCallback = null;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/modal.ts?\n}',
        );

        /***/
      },

    /***/ './src/models.ts':
      /*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book),\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\n// src/models.ts\n// Класи\nclass Book {\n    constructor(id, title, author, year, isBorrowed = false) {\n        this.id = id;\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.isBorrowed = isBorrowed;\n    }\n    borrow() {\n        this.isBorrowed = true;\n    }\n    returnBook() {\n        this.isBorrowed = false;\n    }\n}\nclass User {\n    constructor(id, name) {\n        this.id = id;\n        this.name = name;\n        this.borrowedBooks = [];\n    }\n    borrowBook(bookId) {\n        if (this.borrowedBooks.length >= 3) {\n            throw new Error("Користувач не може брати більше 3 книг");\n        }\n        this.borrowedBooks.push(bookId);\n    }\n    returnBook(bookId) {\n        this.borrowedBooks = this.borrowedBooks.filter(id => id !== bookId);\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?\n}',
        );

        /***/
      },

    /***/ './src/services.ts':
      /*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LibraryService: () => (/* binding */ LibraryService)\n/* harmony export */ });\n/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library */ "./src/library.ts");\n\nclass LibraryService {\n    constructor() {\n        this.books = new _library__WEBPACK_IMPORTED_MODULE_0__.Library();\n        this.users = new _library__WEBPACK_IMPORTED_MODULE_0__.Library();\n    }\n    // ===== КНИГИ =====\n    addBook(book) {\n        this.books.add(book);\n    }\n    getBooks() {\n        return this.books.getAll();\n    }\n    findBookById(id) {\n        return this.books.find(b => b.id === id);\n    }\n    removeBook(id) {\n        this.books.remove(b => b.id === id);\n    }\n    // ===== КОРИСТУВАЧІ =====\n    addUser(user) {\n        this.users.add(user);\n    }\n    getUsers() {\n        return this.users.getAll();\n    }\n    findUserById(id) {\n        return this.users.find(u => u.id === id);\n    }\n    removeUser(id) {\n        this.users.remove(u => u.id === id);\n    }\n    // ===== ПОЗИЧАННЯ / ПОВЕРНЕННЯ =====\n    borrowBook(userId, bookId) {\n        const user = this.findUserById(userId);\n        const book = this.findBookById(bookId);\n        if (!user || !book)\n            return "❌ Користувача або книги не знайдено";\n        if (book.isBorrowed)\n            return "❌ Книга вже позичена";\n        if (user.borrowedBooks.length >= 3)\n            return "❌ Користувач не може брати більше 3 книг";\n        user.borrowBook(book.id);\n        book.borrow();\n        return "✅ Книга успішно позичена";\n    }\n    returnBook(userId, bookId) {\n        const user = this.findUserById(userId);\n        const book = this.findBookById(bookId);\n        if (!user || !book)\n            return "❌ Користувача або книги не знайдено";\n        if (!user.borrowedBooks.includes(book.id))\n            return "❌ У цього користувача ця книга не позичена";\n        user.returnBook(book.id);\n        book.returnBook();\n        return "✅ Книга успішно повернена";\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?\n}',
        );

        /***/
      },

    /***/ './src/storage.ts':
      /*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   StorageService: () => (/* binding */ StorageService)\n/* harmony export */ });\n// src/storageService.ts\nclass StorageService {\n    constructor(key) {\n        this.key = key;\n    }\n    save(data) {\n        localStorage.setItem(this.key, JSON.stringify(data));\n    }\n    load() {\n        const data = localStorage.getItem(this.key);\n        return data ? JSON.parse(data) : [];\n    }\n    clear() {\n        localStorage.removeItem(this.key);\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/storage.ts?\n}',
        );

        /***/
      },

    /***/ './src/validation.ts':
      /*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateNotEmpty: () => (/* binding */ validateNotEmpty),\n/* harmony export */   validateUserId: () => (/* binding */ validateUserId),\n/* harmony export */   validateYear: () => (/* binding */ validateYear)\n/* harmony export */ });\n// src/validation.ts\nfunction validateNotEmpty(value) {\n    return value.trim() !== "";\n}\nfunction validateYear(value) {\n    const year = parseInt(value);\n    return !isNaN(year) && year > 0 && year <= new Date().getFullYear();\n}\nfunction validateUserId(value) {\n    const id = parseInt(value);\n    return !isNaN(id) && id > 0;\n}\n\n\n//# sourceURL=webpack://lab-app/./src/validation.ts?\n}',
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__('./src/app.ts');
  /******/
  /******/
})();
