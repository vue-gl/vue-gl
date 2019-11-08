import { Object3D } from 'three';
import { parseVector3, parseEuler, parseQuaternion } from '../parsers';
import {
  vector3,
  euler,
  quaternion,
  boolean,
  string,
} from '../validators';

/**
 * This is the base mixin component for most object components in VueGL,
 * corresponding [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D).
 * Object3d components inside a object3d component are added
 * as children via THREE.Object3D.prototype.add() method.
 *
 * VglObject3d components inside default slots are added as children.
 */

export default {
  props: {
    /** The object's local position as a 3D vector. */
    position: vector3,
    /** The object's local rotation as a euler angle. */
    rotation: euler,
    /**
     * The object's local rotation as a quaternion (specified in x, y, z, w order).
     * Do not use in conjunction with the rotation prop, since they both control the same property
     * of the underlying THREE.Object3D object.
     */
    rotationQuaternion: quaternion,
    /** The object's local scale as a 3D vector. */
    scale: vector3,
    /** Whether the object gets rendered into shadow map. */
    castShadow: boolean,
    /** Whether the material receives shadows. */
    receiveShadow: boolean,
    /** Optional name of the object. */
    name: string,
    /** Whether the object is visible. */
    hidden: boolean,
  },
  computed: {
    inst: () => new Object3D(),
    parent() { return this.vglObject3d.inst; },
  },
  inject: {
    vglObject3d: {
      default() {
        const listeners = [];
        return {
          listen(fn) { if (!listeners.includes(fn)) listeners.push(fn); },
          unlisten(fn) {
            const index = listeners.indexOf(fn);
            if (index >= 0) listeners.splice(index, 1);
          },
          emit() { listeners.forEach((fn) => fn()); },
        };
      },
    },
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  provide() {
    return { vglObject3d: Object.create(this.vglObject3d, { inst: { get: () => this.inst } }) };
  },
  beforeDestroy() {
    if (this.inst.parent) this.inst.parent.remove(this.inst);
    if (this.name !== undefined) this.vglNamespace.object3ds.delete(this.name, this.inst);
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst && oldInst.parent) oldInst.parent.remove(oldInst);
        if (this.vglObject3d.inst) this.vglObject3d.inst.add(inst);
        if (this.position) inst.position.copy(parseVector3(this.position));
        if (this.rotation) inst.rotation.copy(parseEuler(this.rotation));
        if (this.rotationQuaternion) inst.quaternion.copy(parseQuaternion(this.rotationQuaternion));
        if (this.scale) inst.scale.copy(parseVector3(this.scale));
        Object.assign(inst, {
          castShadow: this.castShadow,
          receiveShadow: this.receiveShadow,
          visible: !this.hidden,
          name: this.name,
        });
        if (this.name !== undefined) this.vglNamespace.object3ds.set(this.name, inst);
      },
      immediate: true,
    },
    parent(inst) { inst.add(this.inst); },
    position(position) { this.inst.position.copy(parseVector3(position)); },
    rotation(rotation) { this.inst.rotation.copy(parseEuler(rotation)); },
    rotationQuaternion(rotationQuaternion) {
      this.inst.quaternion.copy(parseQuaternion(rotationQuaternion));
    },
    scale(scale) { this.inst.scale.copy(parseVector3(scale)); },
    castShadow(castShadow) { this.inst.castShadow = castShadow; },
    receiveShadow(receiveShadow) { this.inst.receiveShadow = receiveShadow; },
    name(name, oldName) {
      this.inst.name = name;
      if (oldName !== undefined) this.vglNamespace.object3ds.delete(oldName, this.inst);
      if (name !== undefined) this.vglNamespace.object3ds.set(name, this.inst);
    },
    hidden(hidden) { this.inst.visible = !hidden; },
  },
  beforeUpdate() { this.vglObject3d.emit(); },
  created() { this.vglObject3d.emit(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
