import VglGeometry from './vgl-geometry.js';
import { TorusKnotGeometry } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    tube: { type: number, default: 0.4 },
    radialSegments: { type: number, default: 8 },
    tubularSegments: { type: number, default: 64 },
    p: { type: number, default: 2 },
    q: { type: number, default: 3 },
  },
  computed: {
    inst() {
      return new TorusKnotGeometry(
        parseFloat(this.radius),
        parseFloat(this.tube),
        parseInt(this.tubularSegments, 10),
        parseInt(this.radialSegments, 10),
        parseInt(this.p, 10),
        parseInt(this.q, 10),
      );
    },
  },
};
