export function nameValidator(value) {
  return value.length > 0 && !value.includes(' ');
}

export function namesValidator(value) {
  return Array.isArray(value) ? value.every((n) => nameValidator(n)) : value.length > 0;
}
