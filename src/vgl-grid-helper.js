import VglLineSegments from './vgl-line-segments.js';
import { GridHelper } from './three.js';
import { validatePropNumber, validatePropString } from './utils.js';

export default {
  mixins: [VglLineSegments],
  props: {
    size: { type: validatePropNumber, default: 10 },
    divisions: { type: validatePropNumber, default: 10 },
    colorCenterLine: { type: validatePropString, default: '#444444' },
    colorGrid: { type: validatePropString, default: '#888888' },
  },
  computed: {
    inst() {
      return new GridHelper(
        parseFloat(this.size),
        parseInt(this.divisions, 10),
        this.colorCenterLine,
        this.colorGrid,
      );
    },
  },
};
