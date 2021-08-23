import { ConeGeometry } from 'three';
import VglCylinderGeometry from './vgl-cylinder-geometry';
import {
  height, heightSegments, openEnded, radialSegments, radius, thetaLength, thetaStart,
} from '../constants';

export default {
  extends: VglCylinderGeometry,
  props: {
    /** The radius of the cone at its base. */
    [radius]: { type: Number, default: 1 },
  },
  computed: {
    /** The THREE.ConeGeometry instance. */
    inst() {
      return new ConeGeometry(
        this[radius], this[height], this[radialSegments], this[heightSegments],
        this[openEnded], this[thetaStart], this[thetaLength],
      );
    },
  },
};
