import { CircleBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * This is a simple shape component of Euclidean geometry,
 * corresponding [THREE.CircleGeometry](https://threejs.org/docs/index.html#api/geometries/CircleGeometry).
 * It is contructed from a number of triangular segments that are oriented around a central point
 * and extend as far out as a given radius.
 * It is built counter-clockwise from a start angle and a given central angle.
 * It can also be used to create regular polygons,
 * where the number of segments determines the number of sides.
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the circle. */
    radius: { type: float, default: 1 },
    /** Number of segments (triangles). */
    segments: { type: int, default: 8 },
    /** Start angle for first segment. */
    thetaStart: { type: float, default: 0 },
    /** The central angle of the circular sector. */
    thetaLength: { type: float, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new CircleBufferGeometry(
        parseFloat(this.radius),
        parseInt(this.segments, 10),
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
