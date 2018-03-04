import VglGeometry from '../core/vgl-geometry.js';
import { ExtrudeBufferGeometry } from '../three.js';

/**
 * A component for creating extruded geometry from a path shape,
 * corresponding [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  computed: {
    inst() { return new ExtrudeBufferGeometry([], {}); },
  },
};
