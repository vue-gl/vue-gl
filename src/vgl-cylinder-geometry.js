import VglGeometry from './vgl-geometry.js';
import { CylinderGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    radiusTop: { type: validatePropNumber, default: 1 },
    radiusBottom: { type: validatePropNumber, default: 1 },
    height: { type: validatePropNumber, default: 1 },
    radialSegments: { type: validatePropNumber, default: 8 },
    heightSegments: { type: validatePropNumber, default: 1 },
    openEnded: Boolean,
    thetaStart: { type: validatePropNumber, default: 0 },
    thetaLength: { type: validatePropNumber, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new CylinderGeometry(
        parseFloat(this.radiusTop),
        parseFloat(this.radiusBottom),
        parseFloat(this.height),
        parseInt(this.radialSegments, 10),
        parseInt(this.heightSegments, 10),
        this.openEnded,
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
