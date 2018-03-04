import VglGeometry from '../core/vgl-geometry.js';
import { BoxBufferGeometry } from '../three.js';
import { number } from '../validators.js';

/**
 * This is the quadrilateral primitive geometry component,
 * corresponding [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Width of the sides on the X axis. */
    width: { type: number, default: 1 },
    /** Height of the sides on the Y axis. */
    height: { type: number, default: 1 },
    /** Depth of the sides on the Z axis. */
    depth: { type: number, default: 1 },
    /** Number of segmented faces along the width of the sides. */
    widthSegments: { type: number, default: 1 },
    /** Number of segmented faces along the height of the sides. */
    heightSegments: { type: number, default: 1 },
    /** Number of segmented faces along the depth of the sides. */
    depthSegments: { type: number, default: 1 },
  },
  computed: {
    inst() {
      return new BoxBufferGeometry(
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
