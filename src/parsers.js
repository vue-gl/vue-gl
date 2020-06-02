import {
  Vector2, Vector3, Euler, Quaternion, Spherical, Color, Fog,
} from 'three';

/**
 * Parses a prop value as names type.
 *
 * @param {string|string[]} names - Prop value.
 * @return {string[]} Parsed array of names.
 */
export function parseNames(names) {
  return Array.isArray(names) ? names : names.trim().split(/\s+/);
}

/**
 * Parses a prop value as color type.
 *
 * @param {string|number|Color} color - Prop value.
 * @return {Color} Parsed THREE.Color instance.
 */
export function parseColor(color) {
  return color.isColor ? color : new Color(color);
}

/**
 * Parses a prop value as vector2 type.
 *
 * @param {string|(string|number)[]|Vector2} vector - Prop value.
 * @return {Vector2} Parsed THREE.Vector2 instance.
 */
export function parseVector2(vector) {
  if (vector.isVector2) return vector;
  const coods = Array.isArray(vector) ? vector : vector.trim().split(/\s+/);
  return new Vector2(...coods.map(parseFloat));
}

/**
 * Parses a prop value as vector3 type.
 *
 * @param {string|(string|number)[]|Vector3} vector - Prop value.
 * @return {Vector3} Parsed THREE.Vector3 instance.
 */
export function parseVector3(vector) {
  if (vector.isVector3) return vector;
  const coods = Array.isArray(vector) ? vector : vector.trim().split(/\s+/);
  return new Vector3(...coods.map(parseFloat));
}

/**
 * Parses a prop value as euler type.
 *
 * @param {string|(string|number)[]|Euler} euler - Prop value.
 * @return {Euler} Parsed THREE.Euler instance.
 */
export function parseEuler(euler) {
  if (euler.isEuler) return euler;
  const coods = Array.isArray(euler) ? euler : euler.trim().split(/\s+/);
  return new Euler(...coods.slice(0, 3).map(parseFloat), coods[3]);
}

/**
 * Parses a prop value as quaternion type.
 *
 * @param {string|(string|number)[]|Quaternion} quaternion - Prop value.
 * @return {Quaternion} Parsed THREE.Quaternion instance.
 */
export function parseQuaternion(quaternion) {
  if (quaternion.isQuaternion) return quaternion;
  const coods = Array.isArray(quaternion) ? quaternion : quaternion.trim().split(/\s+/);
  return new Quaternion(...coods.map(parseFloat));
}

/**
 * Parses a prop value as spherical type.
 *
 * @param {string|(string|number)[]|Spherical} spherical - Prop value.
 * @return {Spherical} Parsed THREE.Spherical instance.
 */
export function parseSpherical(spherical) {
  if (spherical instanceof Spherical) return spherical;
  const coods = Array.isArray(spherical) ? spherical : spherical.trim().split(/\s+/);
  return new Spherical(...coods.map(parseFloat)).makeSafe();
}

/**
 * Parses a prop value as generic array type.
 *
 * @param {string|*[]} array - Prop value.
 * @return {*[]} Parsed array.
 */
export function parseArray(array) {
  return Array.isArray(array) ? array : array.split(',');
}

/**
 * Parses a prop value as integer array type.
 *
 * @param {string|*[]} array - Prop value.
 * @return {number[]} Parsed array of integers.
 */
export function parseIntArray(array) {
  return parseArray(array).map((i) => parseInt(i, 10));
}

/**
 * Parses a prop value as float array type.
 *
 * @param {string|*[]} array - Prop value.
 * @return {number[]} Parsed array of floats.
 */
export function parseFloatArray(array) {
  return parseArray(array).map(parseFloat);
}

/**
 * Parses a prop value as vector2array type.
 *
 * @param {string|(string|Vector2)[]} array - Prop value.
 * @return {Vector2[]} Parsed array of THREE.Vector2 instances.
 */
export function parseVector2Array(array) {
  const isArray = Array.isArray(array);
  if (isArray && array.every((v) => v.isVector2)) return array;
  return (isArray ? array : array.split(',')).map(parseVector2);
}

/**
 * Returns a parsed fog object
 */
export function parseFog(str) {
  return str.isFog ? str : new Fog(...str.trim().split(/\s+/).map((elm, i) => (i === 0 ? elm : parseFloat(elm))));
}
