import {
  Vector2,
  Vector3,
  Euler,
  Spherical,
  Quaternion,
  Fog,
  Color,
} from 'three';

/**
 * Returns a parsed quaternion object.
 */
export function parseQuaternion(str) {
  return str.isQuaternion ? str : new Quaternion(...str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed vector3 object.
 */
export function parseVector3(str) {
  return str.isVector3 ? str : new Vector3(...str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed vector2 object.
 */
export function parseVector2(str) {
  return str.isVector2 ? str : new Vector2(...str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed euler object.
 */
export function parseEuler(str) {
  return str.isEuler ? str : new Euler(...str.trim().split(/\s+/).map((elm, i) => (i === 3 ? elm : parseFloat(elm))));
}

/**
 * Returns a parsed spherical object.
 */
export function parseSpherical(str) {
  return str.isSpherical ? str : new Spherical(...str.trim().split(/\s+/).map(elm => parseFloat(elm))).makeSafe();
}

/**
 * Returns a parsed array.
 */
export function parseArray(str) {
  return Array.isArray(str) ? str : str.split(',');
}

/**
 * Returns a parsed array of vector2.
 */
export function parseVector2Array(str) {
  return parseArray(str).map(elm => parseVector2(elm));
}

/**
 * Returns a parsed fog object
 */
export function parseFog(str) {
  return str.isFog ? str : new Fog(...str.trim().split(/\s+/).map((elm, i) => (i === 0 ? elm : parseFloat(elm))));
}

/**
 * Returns a parsed Color object
 */
export function parseColor(str) {
  return str.isColor ? str : new Color(str);
}
