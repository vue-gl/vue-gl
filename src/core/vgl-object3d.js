import { parseVector3, parseEuler } from '../parsers.js';
import {
  vector3, euler, boolean, string,
} from '../validators.js';
import { Object3D } from '../three.js';

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
    /** The object's local scale as a 3D vector. */
    scale: vector3,
    /** Whether the object gets rendered into shadow map. */
    castShadow: boolean,
    /** Whether the material receives shadows. */
    receiveShadow: boolean,
    /** Optional name of the object. */
    name: string,
    /** Whether the object is visible */
    visible : boolean,
  },
  computed: {
    inst: () => new Object3D(),
  },
  inject: {
    vglObject3d: { default: {} },
    vglNamespace: 'vglNamespace',
  },
  provide() {
    const vm = this;
    return { vglObject3d: { get inst() { return vm.inst; } } };
  },
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  beforeDestroy() {
    const { vglNamespace, inst, name } = this;
    if (inst.parent) inst.parent.remove(inst);
    if (vglNamespace.object3ds[name] === inst) delete vglNamespace.object3ds[name];
    vglNamespace.update();
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst && oldInst.parent) oldInst.parent.remove(oldInst);
        if (this.vglObject3d.inst) this.vglObject3d.inst.add(inst);
        if (this.position) inst.position.copy(parseVector3(this.position));
        if (this.rotation) inst.rotation.copy(parseEuler(this.rotation));
        if (this.scale) inst.scale.copy(parseVector3(this.scale));
        Object.assign(inst, {
          castShadow: this.castShadow,
          receiveShadow: this.receiveShadow,
          visible : this.visible
        });
        if (this.name !== undefined) this.vglNamespace.object3ds[this.name] = inst;
      },
      immediate: true,
    },
    'vglObject3d.inst': function parentInst(inst) { inst.add(this.inst); },
    position(position) { this.inst.position.copy(parseVector3(position)); },
    rotation(rotation) { this.inst.rotation.copy(parseEuler(rotation)); },
    scale(scale) { this.inst.scale.copy(parseVector3(scale)); },
    castShadow(castShadow) { this.inst.castShadow = castShadow; },
    receiveShadow(receiveShadow) { this.inst.receiveShadow = receiveShadow; },
    name(name, oldName) {
      const { vglNamespace: { object3ds }, inst } = this;
      if (object3ds[oldName] === inst) delete object3ds[oldName];
      object3ds[name] = inst;
    },
    visible(visible) { this.inst.visible = visible; }
  },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
