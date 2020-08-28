import { ShapeBufferGeometry } from 'three';
import { int, names } from '../types';
import { VglGeometryWithShapes } from '../mixins';
import { validateNames } from '../validators';

/**
 * A component for creating an one-sided polygonal geometry from one or more path shapes,
 * corresponding [THREE.ShapeGeometry](https://threejs.org/docs/index.html#api/geometries/ShapeGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometryWithShapes],
  props: {
    /** The Shape names */
    shapes: { type: names, validator: validateNames },
    /** Number of segments per shape */
    curveSegments: { type: int, default: 12 },
  },
  computed: {
    /** The THREE.ShapeBufferGeometry instance */
    inst() {
      return new ShapeBufferGeometry(this.shapeObjects, parseInt(this.curveSegments, 10));
    },
  },
};
