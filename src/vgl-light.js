import VglObject3d from './vgl-object3d.js';
import { Light } from './three.js';
import { update, validatePropString, validatePropNumber } from './utils.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: { type: validatePropString, default: '#fff' },
    intensity: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst: () => new Light(),
  },
  watch: {
    color: {
      handler(color) {
        this.inst.color.setStyle(color);
        update(this);
      },
      immediate: true,
    },
    intensity: {
      handler(intensity) {
        this.inst.intensity = parseFloat(intensity);
        update(this);
      },
      immediate: true,
    },
  },
};
