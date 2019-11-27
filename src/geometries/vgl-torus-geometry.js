import { TorusBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { number } from '../validators';

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
    radius: { type: number, default: 1 },
    /** Diamiter of the tube. */
    tube: { type: number, default: 0.4 },
    /** Number of segments of the tube's section. */
    radialSegments: { type: number, default: 8 },
    /** Number of segments along to the tube length direction. */
    tubularSegments: { type: number, default: 6 },
    /** The central angle. */
    arc: { type: number, default: Math.PI * 2 },
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
