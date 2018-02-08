import VglCylinderGeometry from './vgl-cylinder-geometry.js';
import { ConeBufferGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglCylinderGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst() {
      return new ConeBufferGeometry(
        parseFloat(this.radius),
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
