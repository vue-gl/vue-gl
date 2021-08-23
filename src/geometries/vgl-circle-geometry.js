import { CircleGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  inst, radius, segments, thetaLength, thetaStart,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The radius of the circle. */
    [radius]: { type: Number, default: 1 },
    /** The number of segments. */
    [segments]: { type: Number, default: 8, validator: Number.isInteger },
    /** The start angle for the first segment. */
    [thetaStart]: { type: Number, default: 0 },
    /** The central angle of the circular sector. */
    [thetaLength]: { type: Number, default: Math.PI * 2 },
  },
  computed: {
    /** The THREE.CircleGeometry instance. */
    [inst]() {
      return new CircleGeometry(this[radius], this[segments], this[thetaStart], this[thetaLength]);
    },
  },
};
