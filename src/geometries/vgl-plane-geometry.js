import { PlaneBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * A component for generating plane geometries,
 * corresponding [THREE.PlaneGeometry](https://threejs.org/docs/index.html#api/geometries/PlaneGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Width along the X axis. */
    width: { type: float, default: 1 },
    /** Height along the Y axis. */
    height: { type: float, default: 1 },
    /** Number of segments along the X axis. */
    widthSegments: { type: int, default: 1 },
    /** Number of segments along the Y axis. */
    heightSegments: { type: int, default: 1 },
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
