import VglGeometry from './vgl-geometry.js';
import { TorusBufferGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
    tube: { type: validatePropNumber, default: 0.4 },
    radialSegments: { type: validatePropNumber, default: 8 },
    tubularSegments: { type: validatePropNumber, default: 6 },
    arc: { type: validatePropNumber, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new TorusBufferGeometry(
        parseFloat(this.radius),
        parseFloat(this.tube),
        parseInt(this.radialSegments, 10),
        parseInt(this.tubularSegments, 10),
        parseFloat(this.arc),
      );
    },
  },
};
