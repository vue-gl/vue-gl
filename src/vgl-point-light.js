import VglLight from './vgl-light.js';
import { PointLight } from './three.js';
import { parseFloatEx, validatePropNumber, update } from './utils.js';

export default {
  mixins: [VglLight],
  props: {
    distance: {
      type: validatePropNumber,
      default: 0,
    },
    decay: {
      type: validatePropNumber,
      default: 1,
    },
  },
  computed: {
    inst: () => new PointLight(),
  },
  watch: {
    distance: {
      handler(distance) {
        this.inst.distance = parseFloatEx(distance);
        update(this);
      },
      immediate: true,
    },
    decay: {
      handler(decay) {
        this.inst.decay = parseFloatEx(decay);
        update(this);
      },
      immediate: true,
    },
  },
};
