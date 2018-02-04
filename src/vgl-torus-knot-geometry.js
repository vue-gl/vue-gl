import VglGeometry from './vgl-geometry.js';
import { TorusKnotGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
    tube: { type: validatePropNumber, default: 0.4 },
    radialSegments: { type: validatePropNumber, default: 8 },
    tubularSegments: { type: validatePropNumber, default: 64 },
    p: { type: validatePropNumber, default: 2 },
    q: { type: validatePropNumber, default: 3 },
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
