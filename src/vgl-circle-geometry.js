import VglGeometry from './vgl-geometry.js';
import { CircleGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
    segments: { type: validatePropNumber, default: 8 },
    thetaStart: { type: validatePropNumber, default: 0 },
    thetaLength: { type: validatePropNumber, default: Math.PI * 2 },
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
