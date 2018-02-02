import VglObject3d from './vgl-object3d.js';
import { Light } from './three.js';
import { parseFloatEx, update } from './utils.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: {
      type: String,
      default: 'white',
    },
    intensity: {
      type: [String, Number],
      default: 1,
    },
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
        this.inst.intensity = parseFloatEx(intensity);
        update(this);
      },
      immediate: true,
    },
  },
};
