function calculateIceCreamPrice(size, toppings, marshmallow) {
    if (marshmallow === void 0) { marshmallow = false; }
    // Ціни
    var sizePrices = {
        small: 10,
        large: 25
    };
    var toppingPrices = {
        chocolate: 5,
        caramel: 6,
        berries: 10
    };
    var total = sizePrices[size];
    // Додаємо ціни начинок
    for (var _i = 0, toppings_1 = toppings; _i < toppings_1.length; _i++) {
        var topping = toppings_1[_i];
        total += toppingPrices[topping];
    }
    // Додаємо маршмелоу, якщо обрано
    if (marshmallow) {
        total += 5;
    }
    return total;
}
// --- Введення користувача через prompt ---
var sizeInput = prompt("Введіть розмір морозива: small або large");
var toppingsInput = prompt("Введіть начинки через кому (chocolate, caramel, berries)");
var marshmallowInput = prompt("Додати маршмелоу? (yes/no)");
if (sizeInput && toppingsInput) {
    var toppings = toppingsInput
        .split(",")
        .map(function (t) { return t.trim(); })
        .filter(Boolean);
    var marshmallow = (marshmallowInput === null || marshmallowInput === void 0 ? void 0 : marshmallowInput.toLowerCase()) === "yes";
    var price = calculateIceCreamPrice(sizeInput, toppings, marshmallow);
    console.log("\u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0432\u0430\u0448\u043E\u0433\u043E \u043C\u043E\u0440\u043E\u0437\u0438\u0432\u0430: ".concat(price, " \u0433\u0440\u043D"));
    var numberElement = document.getElementById("number");
    if (numberElement) {
        numberElement.innerHTML = "\u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0432\u0430\u0448\u043E\u0433\u043E \u043C\u043E\u0440\u043E\u0437\u0438\u0432\u0430: ".concat(price, " \u0433\u0440\u043D");
    }
}
