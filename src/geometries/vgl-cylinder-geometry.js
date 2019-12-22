import { CylinderBufferGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import { float, int, boolean } from '../types';

/**
 * This is a component for generating cylinder geometries,
 * corresponding [THREE.CylinderGeometry](https://threejs.org/docs/index.html#api/geometries/CylinderGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Radius of the cylinder at the top. */
    radiusTop: { type: float, default: 1 },
    /** Radius of the cylinder at the bottom. */
    radiusBottom: { type: float, default: 1 },
    /** Height of the cylinder. */
    height: { type: float, default: 1 },
    /** Number of segmented faces around the circumference of the cylinder. */
    radialSegments: { type: int, default: 8 },
    /** Number of rows of faces along the height of the cylinder. */
    heightSegments: { type: int, default: 1 },
    /** A Boolean indicating whether the ends of the cylinder are open or capped. */
    openEnded: boolean,
    /** Start angle for first segment. */
    thetaStart: { type: float, default: 0 },
    /** The central angle of the circular sector. */
    thetaLength: { type: float, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new CylinderBufferGeometry(
        parseFloat(this.radiusTop),
        parseFloat(this.radiusBottom),
        parseFloat(this.height),
        parseInt(this.radialSegments, 10),
        parseInt(this.heightSegments, 10),
        this.openEnded,
        parseFloat(this.thetaStart),
        parseFloat(this.thetaLength),
      );
    },
  },
};
