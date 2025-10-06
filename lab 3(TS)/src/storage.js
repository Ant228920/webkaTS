"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
var StorageService = /** @class */ (function () {
    function StorageService(key) {
        this.key = key;
    }
    // зберегти об'єкт у localStorage
    StorageService.prototype.save = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
    // отримати збережені об'єкти
    StorageService.prototype.load = function () {
        var data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    };
    // видалити повністю по ключу
    StorageService.prototype.clear = function () {
        localStorage.removeItem(this.key);
    };
    return StorageService;
}());
exports.StorageService = StorageService;
