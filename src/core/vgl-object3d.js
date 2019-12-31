import { Object3D } from 'three';
import Tree from './tree';
import { parseVector3, parseEuler, parseQuaternion } from '../parsers';
import {
  vector3, euler, quaternion, boolean, name,
} from '../types';
import {
  validateName, validateVector3, validateEuler, validateQuaternion,
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
    position: { type: vector3, validator: validateVector3 },
    /** The object's local rotation as a euler angle. */
    rotation: { type: euler, validator: validateEuler },
    /**
     * The object's local rotation as a quaternion (specified in x, y, z, w order).
     * Do not use in conjunction with the rotation prop, since they both control the same property
     * of the underlying THREE.Object3D object.
     */
    rotationQuaternion: { type: quaternion, validator: validateQuaternion },
    /** The object's local scale as a 3D vector. */
    scale: { type: vector3, validator: validateVector3 },
    /** Whether the object gets rendered into shadow map. */
    castShadow: boolean,
    /** Whether the material receives shadows. */
    receiveShadow: boolean,
    /** Optional name of the object. */
    name: { type: name, validator: validateName },
    /** Whether the object is visible. */
    hidden: boolean,
  },
  inject: {
    vglObject3d: {
      default: () => new Tree(),
    },
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  provide() {
    return {
      vglObject3d: new Tree(this.vglObject3d, () => this.inst),
    };
  },
  computed: {
    /** The THREE.Object3D instance. */
    inst: () => new Object3D(),
    /** The parent THREE.Object3D instance.  */
    parent() { return this.vglObject3d.inst(); },
  },
  methods: {
    /** Emit an event in the `object3ds` namespace. */
    emitAsObject3d() { this.vglNamespace.object3ds.emit(this.name, this.inst); },
  },
  beforeDestroy() {
    if (this.inst.parent) this.inst.parent.remove(this.inst);
    if (this.name !== undefined) {
      this.vglObject3d.unlisten(this.emitAsObject3d);
      this.vglNamespace.object3ds.delete(this.name, this.inst);
    }
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst && oldInst.parent) oldInst.parent.remove(oldInst);
        if (this.parent) this.parent.add(inst);
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
        if (oldInst) this.vglObject3d.emit();
      },
      immediate: true,
    },
    parent(parent) { parent.add(this.inst); },
    name: [
      function handler(newName) { this.inst.name = newName; },
      {
        handler(newName, oldName) {
          if (oldName !== undefined) {
            this.vglNamespace.object3ds.delete(oldName, this.inst);
            if (newName === undefined) this.vglObject3d.unlisten(this.emitAsObject3d);
          }
          if (newName !== undefined) {
            this.vglNamespace.object3ds.set(newName, this.inst);
            if (oldName === undefined) this.vglObject3d.listen(this.emitAsObject3d);
          }
        },
        immediate: true,
      },
    ],
    position(position) {
      this.inst.position.copy(parseVector3(position));
      this.vglObject3d.emit();
    },
    rotation(rotation) {
      this.inst.rotation.copy(parseEuler(rotation));
      this.vglObject3d.emit();
    },
    rotationQuaternion(rotationQuaternion) {
      this.inst.quaternion.copy(parseQuaternion(rotationQuaternion));
      this.vglObject3d.emit();
    },
    scale(scale) {
      this.inst.scale.copy(parseVector3(scale));
      this.vglObject3d.emit();
    },
    castShadow(castShadow) {
      this.inst.castShadow = castShadow;
      this.vglObject3d.emit();
    },
    receiveShadow(receiveShadow) {
      this.inst.receiveShadow = receiveShadow;
      this.vglObject3d.emit();
    },
    hidden(hidden) {
      this.inst.visible = !hidden;
      this.vglObject3d.emit();
    },
  },
  render(h) {
    if (!this.$slots.default) return undefined;
    return h('div', { style: { display: 'none' } }, this.$slots.default);
  },
};
