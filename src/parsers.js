import { Vector3, Euler, Spherical } from './three.js';

/**
 * Returns a parsed vector3 object when the argument is a string.
 * Otherwise pass the argument through.
 */
export function parseVector3(str) {
  return str.isVector3 ? str : new Vector3().fromArray(str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed euler object when the argument is a string.
 * Othewise pass the argument through.
 */
export function parseEuler(str) {
  return str.isEuler ? str : new Euler().fromArray(str.trim().split(/\s+/).map((elm, i) => (i === 3 ? elm : parseFloat(elm))));
}

/**
 * Returns a parsed spherical object when the argument is a string.
 * Otherwise pass the argument through.
 */
export function parseSpherical(str) {
  return str.isSpherical ? str : new Spherical().set(...str.trim().split(/\s+/).map(elm => parseFloat(elm))).makeSafe();
}
