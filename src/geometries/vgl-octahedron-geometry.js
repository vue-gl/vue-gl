import { OctahedronBufferGeometry } from '../three';
import VglGeometry from '../core/vgl-geometry';
import { number } from '../validators';

/**
 * A component for generating a octahedron geometries,
 * corresponding [THREE.OctahedronGeometry](https://threejs.org/docs/index.html#api/geometries/OctahedronGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the octahedron. */
    radius: { type: number, default: 1 },
    /** Setting this to a value greater than 0 adds vertices making it no longer a octahedron. */
    detail: { type: number, default: 0 },
  },
  computed: {
    inst() {
      return new OctahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    },
  },
};
