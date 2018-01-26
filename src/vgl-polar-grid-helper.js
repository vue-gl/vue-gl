import VglLineSegments from './vgl-line-segments.js';
import { PolarGridHelper } from './three.js';
import { number, string } from './constructor-arrays.js';

export default {
  mixins: [VglLineSegments],
  props: {
    radius: { type: number, default: 10 },
    radials: { type: number, default: 16 },
    circles: { type: number, default: 8 },
    divisions: { type: number, default: 64 },
    color1: { type: string, default: '#444444' },
    color2: { type: string, default: '#888888' },
  },
  computed: {
    inst() {
      return new PolarGridHelper(
        parseFloat(this.radius),
        parseInt(this.radials, 10),
        parseInt(this.circles, 10),
        parseInt(this.divisions, 10),
        this.color1,
        this.color2,
      );
    },
  },
};
