import VglGeometry from './vgl-geometry.js';
import { CylinderGeometry } from './three.js';
import { boolean, number } from './constructor-arrays.js';

export default {
  mixins: [VglGeometry],
  props: {
    radiusTop: { type: number, default: 1 },
    radiusBottom: { type: number, default: 1 },
    height: { type: number, default: 1 },
    radialSegments: { type: number, default: 8 },
    heightSegments: { type: number, default: 1 },
    openEnded: boolean,
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 },
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
