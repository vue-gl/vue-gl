import { parseVector3, parseEuler } from './parsers.js';
import { vector3, euler, boolean, string } from './validators.js';
import { Object3D } from './three.js';

export default {
  props: {
    position: vector3,
    rotation: euler,
    scale: vector3,
    castShadow: boolean,
    receiveShadow: boolean,
    name: string,
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
    if (this.inst.parent) this.inst.parent.remove(this.inst);
    this.vglNamespace.update();
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst && oldInst.parent) oldInst.parent.remove(oldInst);
        if (this.vglObject3d.inst) this.vglObject3d.inst.add(inst);
        if (this.position) inst.position.copy(parseVector3(this.position));
        if (this.rotation) inst.rotation.copy(parseEuler(this.rotation));
        if (this.scale) inst.scale.copy(parseVector3(this.scale));
        Object.assign(inst, { castShadow: this.castShadow, receiveShadow: this.receiveShadow });
      },
      immediate: true,
    },
    'vglObject3d.inst': function parentInst(inst) { inst.add(this.inst); },
    position(position) { this.inst.position.copy(parseVector3(position)); },
    rotation(rotation) { this.inst.rotation.copy(parseEuler(rotation)); },
    scale(scale) { this.inst.scale.copy(parseVector3(scale)); },
    castShadow(castShadow) { this.inst.castShadow = castShadow; },
    receiveShadow(receiveShadow) { this.inst.receiveShadow = receiveShadow; },
  },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
