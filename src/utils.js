import { Vector3, Euler, Spherical } from './three.js';

/**
 * Returns a parsed vector3 object when the argument is a string.
 * Otherwise pass the argument through.
 */
export function parseVector3(str) {
  return str.isVector3 ? str : new Vector3(...str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed euler object when the argument is a string.
 * Othewise pass the argument through.
 */
export function parseEuler(str) {
  return str.isEuler ? str : new Euler(...str.trim().split(/\s+/).map((elm, i) => (i === 3 ? elm : parseFloat(elm))));
}

/**
 * Returns a parsed spherical object when the argument is a string.
 * Otherwise pass the argument through.
 */
export function parseSpherical(str) {
  return str.isSpherical ? str : new Spherical(...str.trim().split(/\s+/).map(elm => parseFloat(elm))).makeSafe();
}

/**
 * Constant arrays useful for props validation.
 */
export const validatePropNumber = [String, Number];
export const validatePropString = String;
export const validatePropVector3 = [String, Vector3];
export const validatePropSpherical = [String, Spherical];
export const validatePropBoolean = Boolean;
export const validatePropEuler = [String, Euler];

/**
 * Call the ancestor renderer's vglUpdate function from object3d components.
 */
export function update(vm) {
  if (vm.vglUpdate) vm.vglUpdate();
}

/**
 * Dispatch an update event on the instance of a component.
 */
export function dispatchUpdate(vm) {
  vm.inst.dispatchEvent({ type: 'update' });
}
