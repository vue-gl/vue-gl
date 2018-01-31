import VglGeometry from './vgl-geometry.js';
import { CircleGeometry } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    segments: { type: number, default: 8 },
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new CircleGeometry(
        parseFloat(this.radius),
        parseInt(this.segments, 10),
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
