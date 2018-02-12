import VglGeometry from './vgl-geometry.js';
import { CylinderBufferGeometry } from './three.js';
import { number } from './validators.js';

export default {
  mixins: [VglGeometry],
  props: {
    radiusTop: { type: number, default: 1 },
    radiusBottom: { type: number, default: 1 },
    height: { type: number, default: 1 },
    radialSegments: { type: number, default: 8 },
    heightSegments: { type: number, default: 1 },
    openEnded: Boolean,
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new CylinderBufferGeometry(
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
