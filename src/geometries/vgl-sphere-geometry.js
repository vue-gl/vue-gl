import { SphereBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * This is a component for generating sphere geometries,
 * corresponding [THREE.SphereGeometry](https://threejs.org/docs/index.html#api/geometries/SphereGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Sphere radius. */
    radius: { type: float, default: 1 },
    /** Number of horizontal segments. */
    widthSegments: { type: int, default: 8 },
    /** Number of vertical segments. */
    heightSegments: { type: int, default: 6 },
    /** Specify horizontal starting angle. */
    phiStart: { type: float, default: 0 },
    /** Specify horizontal sweep angle size. */
    phiLength: { type: float, default: Math.PI * 2 },
    /** Specify vertical starting angle. */
    thetaStart: { type: float, default: 0 },
    /** Specify vertical sweep angle size. */
    thetaLength: { type: float, default: Math.PI },
  },
  computed: {
    inst() {
      return new SphereBufferGeometry(
        parseFloat(this.radius),
        parseInt(this.widthSegments, 10),
        parseInt(this.heightSegments, 10),
        parseFloat(this.phiStart),
        parseFloat(this.phiLength),
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
