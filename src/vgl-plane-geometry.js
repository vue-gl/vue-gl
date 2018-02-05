import VglGeometry from './vgl-geometry.js';
import { PlaneBufferGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    width: { type: validatePropNumber, default: 1 },
    height: { type: validatePropNumber, default: 1 },
    widthSegments: { type: validatePropNumber, default: 1 },
    heightSegments: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst() {
      return new PlaneBufferGeometry(
        parseFloat(this.width),
        parseFloat(this.height),
        parseInt(this.widthSegments, 10),
        parseInt(this.heightSegments, 10),
      );
    },
  },
};
