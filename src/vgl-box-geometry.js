import VglGeometry from './vgl-geometry.js';
import { BoxGeometry } from './three.js';
import { validatePropNumber } from './utils.js';

export default {
  mixins: [VglGeometry],
  props: {
    width: { type: validatePropNumber, default: 1 },
    height: { type: validatePropNumber, default: 1 },
    depth: { type: validatePropNumber, default: 1 },
    widthSegments: { type: validatePropNumber, default: 1 },
    heightSegments: { type: validatePropNumber, default: 1 },
    depthSegments: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst() {
      return new BoxGeometry(
        parseFloat(this.width),
        parseFloat(this.height),
        parseFloat(this.depth),
        parseInt(this.widthSegments, 10),
        parseInt(this.heightSegments, 10),
        parseInt(this.depthSegments, 10),
      );
    },
  },
};
