import { RingBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * This is a simple shape component of Euclidean geometry,
 * corresponding [THREE.RingGeometry](https://threejs.org/docs/index.html#api/geometries/RingGeometry).
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
    /** Inner radius of the ring. */
    innerRadius: { type: float, default: 0.5 },
    /** Outer radius of the ring. */
    outerRadius: { type: float, default: 1 },
    /** Number of segments along to the tangential direction. */
    thetaSegments: { type: int, default: 8 },
    /** Number of segments along to the radial direction. */
    phiSegments: { type: int, default: 1 },
    /** The starting angle. */
    thetaStart: { type: float, default: 0 },
    /** The central angle. */
    thetaLength: { type: float, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new RingBufferGeometry(
        parseFloat(this.innerRadius),
        parseFloat(this.outerRadius),
        parseInt(this.thetaSegments, 10),
        parseInt(this.phiSegments, 10),
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
