import { parseVector3, parseEuler, findParent, update, validatePropVector3, validatePropEuler, validatePropBoolean } from './utils.js';
import { Object3D, Vector3, Euler } from './three.js';

const defaultPosition = new Vector3();
const defaultRotation = new Euler();
const defaultScale = new Vector3(1, 1, 1);

export default {
  isVglObject3d: true,
  props: {
    position: { type: validatePropVector3, default: () => defaultPosition },
    rotation: { type: validatePropEuler, default: () => defaultRotation },
    scale: { type: validatePropVector3, default: () => defaultScale },
    castShadow: validatePropBoolean,
    receiveShadow: validatePropBoolean,
  },
  computed: {
    inst: () => new Object3D(),
  },
  inject: {
    vglUpdate: { default: undefined },
  },
  created() {
    const parent = findParent(this, 'isVglObject3d');
    if (parent) parent.inst.add(this.inst);
  },
  beforeDestroy() {
    if (this.inst.parent) this.inst.parent.remove(this.inst);
  },
  watch: {
    position: {
      handler(position) {
        parseVector3(position || defaultPosition, this.inst.position);
        update(this);
      },
      immediate: true,
    },
    rotation: {
      handler(rotation) {
        parseEuler(rotation || defaultRotation, this.inst.rotation);
        update(this);
      },
      immediate: true,
    },
    scale: {
      handler(scale) {
        parseVector3(scale || defaultScale, this.inst.scale);
        update(this);
      },
      immediate: true,
    },
    castShadow: {
      handler(castShadow) {
        this.inst.castShadow = castShadow;
        update(this);
      },
      immediate: true,
    },
    receiveShadow: {
      handler(receiveShadow) {
        this.inst.receiveShadow = receiveShadow;
        update(this);
      },
      immediate: true,
    },
    inst(inst, oldInst) {
      if (oldInst.children.length) inst.add(...oldInst.children);
      inst.position.copy(oldInst.position);
      inst.rotation.copy(oldInst.rotation);
      inst.scale.copy(oldInst.scale);
      if (oldInst.parent) oldInst.parent.remove(oldInst).add(inst);
      update(this);
    },
  },
  render(h) {
    if (this.$slots.default) return h('div', this.$slots.default);
    return undefined;
  },
};
