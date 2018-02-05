import VglGeometry from './vgl-geometry.js';
import { SphereBufferGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
    widthSegments: { type: validatePropNumber, default: 8 },
    heightSegments: { type: validatePropNumber, default: 6 },
    phiStart: { type: validatePropNumber, default: 0 },
    phiLength: { type: validatePropNumber, default: Math.PI * 2 },
    thetaStart: { type: validatePropNumber, default: 0 },
    thetaLength: { type: validatePropNumber, default: Math.PI },
  },
  computed: {
    inst() {
      return new SphereBufferGeometry(
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
