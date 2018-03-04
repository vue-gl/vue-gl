import VglGeometry from '../core/vgl-geometry.js';
import { RingBufferGeometry } from '../three.js';
import { number } from '../validators.js';

/**
 * This is a simple shape component of Euclidean geometry,
 * corresponding [THREE.RingGeometry](https://threejs.org/docs/index.html#api/geometries/RingGeometry).
 * It is contructed from a number of triangular segments that are oriented around a central point
 * and extend as far out as a given radius.
 * It is built counter-clockwise from a start angle and a given central angle.
 * It can also be used to create regular polygons,
 * where the number of segments determines the number of sides.
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Inner radius of the ring. */
    innerRadius: { type: number, default: 0.5 },
    /** Outer radius of the ring. */
    outerRadius: { type: number, default: 1 },
    /** Number of segments along to the tangential direction. */
    thetaSegments: { type: number, default: 8 },
    /** Number of segments along to the radial direction. */
    phiSegments: { type: number, default: 1 },
    /** The starting angle. */
    thetaStart: { type: number, default: 0 },
    /** The central angle. */
    thetaLength: { type: number, default: Math.PI * 2 },
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
