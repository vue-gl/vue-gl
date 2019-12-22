import { TetrahedronBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * A component for generating a tetrahedron geometries,
 * corresponding [THREE.TetrohedronGeometry](https://threejs.org/docs/index.html#api/geometries/TetrohedronGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the tetrahedron. */
    radius: { type: float, default: 1 },
    /** Setting this to a value greater than 0 adds vertices making it no longer a tetrahedron. */
    detail: { type: int, default: 0 },
  },
  computed: {
    inst() {
      return new TetrahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    },
  },
};
