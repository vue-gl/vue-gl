import VglGeometry from './vgl-geometry.js';
import { RingGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    innerRadius: { type: validatePropNumber, default: 0.5 },
    outerRadius: { type: validatePropNumber, default: 1 },
    thetaSegments: { type: validatePropNumber, default: 8 },
    phiSegments: { type: validatePropNumber, default: 1 },
    thetaStart: { type: validatePropNumber, default: 0 },
    thetaLength: { type: validatePropNumber, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new RingGeometry(
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
