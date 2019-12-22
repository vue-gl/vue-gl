import { TorusBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int } from '../types';

/**
 * A component for generating torus geometries,
 * corresponding [THREE.TorusGeometry](https://threejs.org/docs/index.html#api/geometries/TorusGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the torus. */
    radius: { type: float, default: 1 },
    /** Diamiter of the tube. */
    tube: { type: float, default: 0.4 },
    /** Number of segments of the tube's section. */
    radialSegments: { type: int, default: 8 },
    /** Number of segments along to the tube length direction. */
    tubularSegments: { type: int, default: 6 },
    /** The central angle. */
    arc: { type: float, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new TorusBufferGeometry(
        parseFloat(this.radius),
        parseFloat(this.tube),
        parseInt(this.radialSegments, 10),
        parseInt(this.tubularSegments, 10),
        parseFloat(this.arc),
      );
    },
  },
};
