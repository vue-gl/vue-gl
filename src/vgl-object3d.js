import { parseVector3, parseEuler, update, validatePropVector3, validatePropEuler, validatePropBoolean } from './utils.js';
import { Object3D } from './three.js';

export default {
  isVglObject3d: true,
  props: {
    position: validatePropVector3,
    rotation: validatePropEuler,
    scale: validatePropVector3,
    castShadow: validatePropBoolean,
    receiveShadow: validatePropBoolean,
  },
  computed: {
    inst: () => new Object3D(),
  },
  inject: {
    vglUpdate: { default: undefined },
    vglObject3d: { default: {} },
  },
  provide() {
    const vm = this;
    return { vglObject3d: { get inst() { return vm.inst; } } };
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
        update(this);
      },
      immediate: true,
    },
    'vglObject3d.inst': function watch(inst) {
      inst.add(this.inst);
      update(this);
    },
    position(position) {
      this.inst.position.copy(parseVector3(position));
      update(this);
    },
    rotation(rotation) {
      this.inst.rotation.copy(parseEuler(rotation));
      update(this);
    },
    scale(scale) {
      this.inst.scale.copy(parseVector3(scale));
      update(this);
    },
    castShadow(castShadow) {
      this.inst.castShadow = castShadow;
      update(this);
    },
    receiveShadow(receiveShadow) {
      this.inst.receiveShadow = receiveShadow;
      update(this);
    },
  },
  render(h) {
    if (this.$slots.default) return h('div', this.$slots.default);
    return undefined;
  },
};
