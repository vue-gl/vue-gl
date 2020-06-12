import { PolyhedronBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  float, int, floatArray, intArray,
} from '../types';
import { validateFloatArray, validateIntArray } from '../validators';
import { parseFloatArray, parseIntArray } from '../parsers';

/**
 * A component for generating a solid geometry with flat faces from vertices and face indices.
 * corresponding [THREE.PolyhedronGeometry](https://threejs.org/docs/index.html#api/geometries/PolyhedronGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Array of points of the form [x1, y1, z1, x2, y2, z2, ...] */
    vertices: { type: floatArray, validator: validateFloatArray },
    /** Array of indices that make up the faces of the form [0, 1, 2, 2, 3, 0, ...] */
    indices: { type: intArray, validator: validateIntArray },
    /** The radius of the final shape. */
    radius: { type: float, default: 1 },
    /** How many levels to subdivide the geometry. */
    detail: { type: int, default: 0 },
  },
  computed: {
    inst() {
      const vertices = parseFloatArray(this.vertices);
      const indices = parseIntArray(this.indices);
      const radius = parseFloat(this.radius);
      const detail = parseInt(this.detail, 10);
      return new PolyhedronBufferGeometry(vertices, indices, radius, detail);
    },
  },
};
