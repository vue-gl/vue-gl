import VglGeometry from './vgl-geometry.js';
import { SphereGeometry } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    widthSegments: { type: number, default: 8 },
    heightSegments: { type: number, default: 6 },
    phiStart: { type: number, default: 0 },
    phiLength: { type: number, default: Math.PI * 2 },
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI },
  },
  computed: {
    inst() {
      return new SphereGeometry(
        parseFloat(this.radius),
        parseInt(this.widthSegments, 10),
        parseInt(this.heightSegments, 10),
        parseFloat(this.phiStart),
        parseFloat(this.phiLength),
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
