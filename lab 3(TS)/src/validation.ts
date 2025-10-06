// Перевірка, що поле не пусте
export function validateNotEmpty(value: string): boolean {
    // 🔍 Лог для діагностики
    console.log("validateNotEmpty:", value, "=>", value.trim().length > 0);
    return value.trim().length > 0;
}

// Перевірка, що рік коректний
export function validateYear(value: string): boolean {
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();

    const valid = !isNaN(year) && year >= 1000 && year <= currentYear;
    // 🔍 Лог
    console.log("validateYear:", value, "=>", valid);
    return valid;
}

// Перевірка ID користувача
export function validateUserId(value: string): boolean {
    const id = parseInt(value);
    const valid = !isNaN(id) && id > 0;
    // 🔍 Лог
    console.log("validateUserId:", value, "=>", valid);
    return valid;
}
