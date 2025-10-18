export function validateNotEmpty(value: string): boolean {
  console.log('validateNotEmpty:', value, '=>', value.trim().length > 0);
  return value.trim().length > 0;
}

export function validateYear(value: string): boolean {
  const year = parseInt(value);
  const currentYear = new Date().getFullYear();

  const valid = !isNaN(year) && year >= 1000 && year <= currentYear;
  console.log('validateYear:', value, '=>', valid);
  return valid;
}

export function validateUserId(value: string): boolean {
  const id = parseInt(value);
  const valid = !isNaN(id) && id > 0;
  console.log('validateUserId:', value, '=>', valid);
  return valid;
}
