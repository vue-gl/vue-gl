import VglLight from './vgl-light.js';
import { PointLight } from './three.js';
import { validatePropNumber, update } from './utils.js';

export default {
  mixins: [VglLight],
  props: {
    distance: { type: validatePropNumber, default: 0 },
    decay: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst: () => new PointLight(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay),
        });
      },
      immediate: true,
    },
    distance(distance) {
      this.inst.distance = parseFloat(distance);
      update(this);
    },
    decay(decay) {
      this.inst.decay = parseFloat(decay);
      update(this);
    },
  },
};
