import VglLineSegments from './vgl-line-segments.js';
import { AxesHelper } from './three.js';
import { parseFloatEx } from './utils.js';

export default {
  mixins: [VglLineSegments],
  props: { size: [String, Number] },
  computed: {
    inst() {
      return new AxesHelper(parseFloatEx(this.size));
    },
  },
};
