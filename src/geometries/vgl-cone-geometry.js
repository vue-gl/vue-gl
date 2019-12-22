import { ConeBufferGeometry } from 'three';
import VglCylinderGeometry from './vgl-cylinder-geometry';
import { float } from '../types';

/**
 * This is a component for generating cone geometries,
 * corresponding [THREE.ConeGeometry](https://threejs.org/docs/index.html#api/geometries/ConeGeometry).
 *
 * Properties of [VglCylinderGeometry](vgl-cylinder-geometry) are also available as mixin.
 */

export default {
  mixins: [VglCylinderGeometry],
  props: {
    /** Radius of the cone at the base. */
    radius: { type: float, default: 1 },
  },
  computed: {
    inst() {
      return new ConeBufferGeometry(
        parseFloat(this.radius),
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
