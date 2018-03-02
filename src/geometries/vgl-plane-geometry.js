import VglGeometry from '../core/vgl-geometry.js';
import { PlaneBufferGeometry } from '../three.js';
import { number } from '../validators.js';

/**
 * A component for generating plane geometries,
 * corresponding [THREE.PlaneGeometry](https://threejs.org/docs/index.html#api/geometries/PlaneGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Width along the X axis. */
    width: { type: number, default: 1 },
    /** Height along the Y axis. */
    height: { type: number, default: 1 },
    /** Number of segments along the X axis. */
    widthSegments: { type: number, default: 1 },
    /** Number of segments along the Y axis. */
    heightSegments: { type: number, default: 1 },
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
