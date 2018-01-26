import VglLineSegments from './vgl-line-segments.js';
import { AxesHelper } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglLineSegments],
  props: {
    size: { type: number, default: 1 },
  },
  computed: {
    inst() {
      return new AxesHelper(parseFloat(this.size));
    },
  },
};
