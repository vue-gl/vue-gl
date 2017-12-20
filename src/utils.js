import {Vector3, Euler, Spherical} from "./three.js";

/**
 * Returns a parsed vector3 object when the argument is a string. Otherwise pass the argument through.
 */
export function parseVector3(prop, vector) {
    if (typeof prop !== "string") return vector ? vector.copy(prop): prop;
    return (vector || new Vector3()).fromArray(prop.trim().split(/\s+/).map((elm) => parseFloat(elm)));
}

/**
 * Returns a parsed euler object when the argument is a string. Othewise pass the argument through.
 */
export function parseEuler(prop, euler) {
    if (typeof prop !== "string") return euler ? euler.copy(prop): prop;
    return (euler || new Euler()).fromArray(prop.trim().split(/\s+/).map((elm, i) => i === 3 ? elm: parseFloat(elm)));
}

/**
 * Returns a parsed spherical object when the argument is a string. Otherwise pass the argument through.
 */
export function parseSpherical(prop, spherical) {
    if (typeof prop !== "string") return spherical ? spherical.copy(prop): prop;
    return (spherical || new Spherical()).set(...prop.trim().split(/\s+/).map((elm) => parseFloat(elm))).makeSafe();
}

/**
 * Returns a parsed integer number when the argument is a string. Otherwise pass the argument through.
 */
export function parseInt_(str) {
    return typeof str === "string" ? parseInt(str, 10): str;
}

/**
 * Returns a parsed float number when the argument is a string. Otherwise pass the argument through.
 */
export function parseFloat_(str) {
    return typeof str === "string" ? parseFloat(str): str;
}

/**
 * Create an object that has array's items as keys. Values are set by setter function.
 */
export function createObjectFromArray(keyArray, valueSetter, baseObject = {}) {
    return keyArray.reduce((obj, key, index) => {
        obj[key] = valueSetter(key, index);
        return obj;
    } , baseObject);
}

/**
 * Find the nearest ancestor component that has the [key] option.
 */
export function findParent(vm, key) {
    const $parent = vm.$parent;
    if ($parent) return $parent.$options[key] ? $parent: findParent($parent, key);
}

/**
 * Constant arrays useful for props validation.
 */
export const validatePropNumber = [String, Number];
export const validatePropString = String;

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
    vm.inst.dispatchEvent({type: "update"});
}
