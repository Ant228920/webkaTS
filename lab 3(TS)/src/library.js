"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var models_1 = require("./models");
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
    }
    Library.prototype.add = function (item) {
        this.items.push(item);
    };
    Library.prototype.getAll = function () {
        return this.items;
    };
    Library.prototype.remove = function (item) {
        return this.items = this.items.filter(function (i) { return i !== item; });
    };
    Library.prototype.find = function (predicate) {
        return this.items.find(predicate);
    };
    return Library;
}());
exports.Library = Library;
var item1 = new Library();
item1.add(new models_1.Book("some", "some", 10));
item1.add(new models_1.Book("some2", "some2", 10));
console.log(item1.getAll());
var item2 = new Library();
item2.add(new models_1.User(1, "some"));
console.log(item2.getAll());
