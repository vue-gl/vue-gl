import VglLight from './vgl-light.js';
import { SpotLight } from './three.js';
import { parseVector3, findParent, validatePropNumber, validatePropVector3, update } from './utils.js';

export default {
  mixins: [VglLight],
  props: {
    distance: { type: validatePropNumber, default: 0 },
    decay: { type: validatePropNumber, default: 1 },
    angle: { type: validatePropNumber, default: Math.PI / 3 },
    penumbra: { type: validatePropNumber, default: 0 },
    target: validatePropVector3,
  },
  computed: {
    inst: () => new SpotLight(),
  },
  created() {
    if (this.target) {
      parseVector3(this.target, this.inst.target.position);
      const $parent = findParent(this, 'isVglObject3d');
      if ($parent) {
        this.$watch(() => $parent.inst, (inst, old) => {
          if (old) old.remove(this.inst.target);
          inst.add(this.inst.target);
          update(this);
        }, { immediate: true });
      }
    }
  },
  beforeDestroy() {
    if (this.inst.target.parent) this.inst.target.parent.remove(this.inst.target);
  },
  watch: {
    distance: {
      handler(distance) {
        this.inst.distance = parseFloat(distance);
        update(this);
      },
      immediate: true,
    },
    decay: {
      handler(decay) {
        this.inst.decay = parseFloat(decay);
        update(this);
      },
      immediate: true,
    },
    angle: {
      handler(angle) {
        this.inst.angle = parseFloat(angle);
        update(this);
      },
      immediate: true,
    },
    penumbra: {
      handler(penumbra) {
        this.inst.penumbra = parseFloat(penumbra);
        update(this);
      },
      immediate: true,
    },
    target(target) {
      parseVector3(target, this.inst.target.position);
      update(this);
    },
  },
};
