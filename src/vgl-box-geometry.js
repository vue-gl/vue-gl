import VglGeometry from './vgl-geometry.js';
import { BoxGeometry } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglGeometry],
  props: {
    width: { type: number, default: 1 },
    height: { type: number, default: 1 },
    depth: { type: number, default: 1 },
    widthSegments: { type: number, default: 1 },
    heightSegments: { type: number, default: 1 },
    depthSegments: { type: number, default: 1 },
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
