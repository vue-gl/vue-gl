import { IcosahedronBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * A component for generating a icosahedron geometries,
 * corresponding [THREE.IcosahedronGeometry](https://threejs.org/docs/index.html#api/geometries/IcosahedronGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the icosahedron. */
    radius: { type: float, default: 1 },
    /** Setting this to a value greater than 0 adds vertices making it no longer a icosahedron. */
    detail: { type: int, default: 0 },
  },
  computed: {
    inst() {
      return new IcosahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    },
  },
};
