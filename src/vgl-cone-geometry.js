import VglCylinderGeometry from './vgl-cylinder-geometry.js';
import { ConeGeometry } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglCylinderGeometry],
  props: {
    radius: { type: number, default: 1 },
  },
  computed: {
    inst() {
      return new ConeGeometry(
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
