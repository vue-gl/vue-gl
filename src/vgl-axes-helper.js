import VglLineSegments from './vgl-line-segments.js';
import { AxesHelper } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglLineSegments],
  props: {
    size: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst() { return new AxesHelper(parseFloat(this.size)); },
  },
};
