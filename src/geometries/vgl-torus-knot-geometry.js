import { TorusKnotBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { number } from '../types';

/**
 * A component for generating torus knot geometries,
 * corresponding [THREE.TorusKnotGeometry](https://threejs.org/docs/index.html#api/geometries/TorusKnotGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the torus. */
    radius: { type: number, default: 1 },
    /** Diamiter of the tube. */
    tube: { type: number, default: 0.4 },
    /** Number of segments of the tube's section. */
    radialSegments: { type: number, default: 8 },
    /** Number of segments along to the tube length direction. */
    tubularSegments: { type: number, default: 64 },
    /**
     * This value determines how many times the geometry winds
     * around its axis of rotational symmetry.
     */
    p: { type: number, default: 2 },
    /**
     * This value determines how many times the geometry winds
     * around a circle in the interior of the torus.
     */
    q: { type: number, default: 3 },
  },
  computed: {
    inst() {
      return new TorusKnotBufferGeometry(
        parseFloat(this.radius),
        parseFloat(this.tube),
        parseInt(this.tubularSegments, 10),
        parseInt(this.radialSegments, 10),
        parseInt(this.p, 10),
        parseInt(this.q, 10),
      );
    },
  },
};
