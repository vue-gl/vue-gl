import { SphereBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { number } from '../validators';

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
    radius: { type: number, default: 1 },
    /** Number of horizontal segments. */
    widthSegments: { type: number, default: 8 },
    /** Number of vertical segments. */
    heightSegments: { type: number, default: 6 },
    /** Specify horizontal starting angle. */
    phiStart: { type: number, default: 0 },
    /** Specify horizontal sweep angle size. */
    phiLength: { type: number, default: Math.PI * 2 },
    /** Specify vertical starting angle. */
    thetaStart: { type: number, default: 0 },
    /** Specify vertical sweep angle size. */
    thetaLength: { type: number, default: Math.PI },
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
