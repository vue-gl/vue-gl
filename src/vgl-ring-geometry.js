import VglGeometry from './vgl-geometry.js';
import { RingBufferGeometry } from './three.js';
import { number } from './validators.js';

export default {
  mixins: [VglGeometry],
  props: {
    innerRadius: { type: number, default: 0.5 },
    outerRadius: { type: number, default: 1 },
    thetaSegments: { type: number, default: 8 },
    phiSegments: { type: number, default: 1 },
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new RingBufferGeometry(
        parseFloat(this.innerRadius),
        parseFloat(this.outerRadius),
        parseInt(this.thetaSegments, 10),
        parseInt(this.phiSegments, 10),
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
