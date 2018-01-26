import VglLineSegments from './vgl-line-segments.js';
import { GridHelper } from './three.js';
import { number, string } from './constructor-arrays.js';

export default {
  mixins: [VglLineSegments],
  props: {
    size: { type: number, default: 10 },
    divisions: { type: number, default: 10 },
    colorCenterLine: { type: string, default: '#444444' },
    colorGrid: { type: string, default: '#888888' },
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
