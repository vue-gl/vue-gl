import { SphereGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  heightSegments, inst, phiLength, phiStart, radius, thetaLength, thetaStart, widthSegments,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The radius of the sphere. */
    [radius]: { type: Number, default: 1 },
    /** The number of horizontal segments. */
    [widthSegments]: { type: Number, default: 8, validator: Number.isInteger },
    /** The number of vertical segments. */
    [heightSegments]: { type: Number, default: 6, validator: Number.isInteger },
    /** The horizontal starting angle. */
    [phiStart]: { type: Number, default: 0 },
    /** The horizontal sweep angle size. */
    [phiLength]: { type: Number, default: Math.PI * 2 },
    /** The vertical starting angle. */
    [thetaStart]: { type: Number, default: 0 },
    /** The vertical sweep angle size. */
    [thetaLength]: { type: Number, default: Math.PI },
  },
  computed: {
    /** The THREE.SphereGeometry instance. */
    [inst]() {
      return new SphereGeometry(
        this[radius], this[widthSegments], this[heightSegments], this[phiStart], this[phiLength],
        this[thetaStart], this[thetaLength],
      );
    },
  },
};
