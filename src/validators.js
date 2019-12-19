import { Vector3 } from 'three';

/**
 * Validator for a name type prop.
 *
 * @param {string} value - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function nameValidator(value) {
  return value.length > 0 && !value.includes(' ');
}

export function namesValidator(value) {
  return Array.isArray(value) ? value.every((n) => nameValidator(n)) : value.length > 0;
}

/**
 * Validator for a vector3 type prop.
 *
 * @param  {string|Vector3} value - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function vector3Validator(value) {
  // Vector3 instance is always valid.
  if (value instanceof Vector3) return true;
  const arr = value.trim().split(/\s+/);
  // 3 Arguments should be passed.
  if (arr.length !== 3) return false;
  // Every coodinate should not be NaN.
  return arr.every((el) => !Number.isNaN(parseFloat(el)));
}
