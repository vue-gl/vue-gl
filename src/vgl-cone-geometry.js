import VglCylinderGeometry from './vgl-cylinder-geometry.js';
import { ConeBufferGeometry } from './three.js';
import { number } from './validators.js';

export default {
  mixins: [VglCylinderGeometry],
  props: {
    radius: { type: number, default: 1 },
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
