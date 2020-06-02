import {
  Vector3, Vector2, Euler, Quaternion, Spherical,
} from 'three';

function isFloat(value) {
  return !Number.isNaN(parseFloat(value));
}

function isInt(value) {
  return !Number.isNaN(parseInt(value, 10));
}

/**
 * Validates a name type prop.
 *
 * @param {string} name - Prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateName(name) {
  return /^\s*\S+\s*$/.test(name);
}

/**
 * Validates a names type prop.
 *
 * @param {string|string[]} names - Prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateNames(names) {
  return Array.isArray(names) ? names.every(validateName) : /\S+/.test(names);
}

/**
 * Validates a vector2 type prop.
 *
 * @param  {string|(string|number)[]|Vector2} vector - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateVector2(vector) {
  if (vector instanceof Vector2) return true;
  const v = Array.isArray(vector) ? vector : vector.trim().split(/\s+/);
  return v.length === 2 && v.every(isFloat);
}

/**
 * Validates a vector3 type prop.
 *
 * @param  {string|(string|number)[]|Vector3} vector - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateVector3(vector) {
  if (vector instanceof Vector3) return true;
  const v = Array.isArray(vector) ? vector : vector.trim().split(/\s+/);
  return v.length === 3 && v.every(isFloat);
}

/**
 * Validates a euler type prop.
 *
 * @param  {string|(string|number)[]|Euler} euler - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateEuler(euler) {
  if (euler instanceof Euler) return true;
  const v = Array.isArray(euler) ? euler : euler.trim().split(/\s+/);
  return v.length === 4 && v.slice(0, 3).every(isFloat) && /[XYZ]{3}/.test(v[3]);
}

/**
 * Validates a quaternion type prop.
 *
 * @param  {string|(string|number)[]|Quaternion} quaternion - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateQuaternion(quaternion) {
  if (quaternion instanceof Quaternion) return true;
  const q = Array.isArray(quaternion) ? quaternion : quaternion.trim().split(/\s+/);
  return q.length === 4 && q.every(isFloat);
}

/**
 * Validates a spherical type prop.
 *
 * @param  {string|(string|number)[]|Spherical} spherical - The prop value.
 * @return {boolean} Whether value is valid or not.
 */
export function validateSpherical(spherical) {
  if (spherical instanceof Spherical) return true;
  const s = Array.isArray(spherical) ? spherical : spherical.trim().split(/\s+/);
  return s.length === 3 && s.every(isFloat);
}

/**
 * Validates a intArray type prop.
 *
 * @param {string|(string|number)[]} array - The prop value.
 * @return {boolean} Wheter value is valid or not.
 */
export function validateIntArray(array) {
  return (Array.isArray(array) ? array : array.split(',')).every(isInt);
}

/**
 * Validates a floatArray type prop.
 *
 * @param {string|(string|number)[]} array - The prop value.
 * @return {boolean} Wheter value is valid or not.
 */
export function validateFloatArray(array) {
  return (Array.isArray(array) ? array : array.split(',')).every(isFloat);
}

/**
 * Validates a vector2Array type prop.
 *
 * @param {string|(string|Vector2)[]} array - The prop value.
 * @return {boolean} Wheter value is valid or not.
 */
export function validateVector2Array(array) {
  return (Array.isArray(array) ? array : array.split(',')).every(validateVector2);
}
