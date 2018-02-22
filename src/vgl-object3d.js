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
  beforeUpdate() {
    this.vglNamespace.update();
  },
  beforeDestroy() {
    if (this.inst.parent) this.inst.parent.remove(this.inst);
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
        if (this.vglUpdate) this.vglUpdate();
      },
      immediate: true,
    },
    'vglObject3d.inst': function watch(inst) {
      inst.add(this.inst);
    },
    position(position) {
      this.inst.position.copy(parseVector3(position));
      if (this.vglUpdate) this.vglUpdate();
    },
    rotation(rotation) {
      this.inst.rotation.copy(parseEuler(rotation));
      if (this.vglUpdate) this.vglUpdate();
    },
    scale(scale) {
      this.inst.scale.copy(parseVector3(scale));
      if (this.vglUpdate) this.vglUpdate();
    },
    castShadow(castShadow) {
      this.inst.castShadow = castShadow;
      if (this.vglUpdate) this.vglUpdate();
    },
    receiveShadow(receiveShadow) {
      this.inst.receiveShadow = receiveShadow;
      if (this.vglUpdate) this.vglUpdate();
    },
  },
  render(h) {
    if (this.$slots.default) return h('div', this.$slots.default);
    return undefined;
  },
};
