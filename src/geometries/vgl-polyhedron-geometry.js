import { PolyhedronGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  detail, indices, inst, radius, vertices,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** An array of points of the form [x1, y1, z1, x2, y2, z2, ...] */
    [vertices]: {
      type: Array,
      default: () => [],
      validator: (array) => array.every((e) => typeof e === 'number' || e instanceof Number),
    },
    /** An array of face making indices of the form [0, 1, 2, 2, 3, 0, ...] */
    [indices]: { type: Array, default: () => [], validator: (a) => a.every(Number.isInteger) },
    /** The radius of the shape. */
    [radius]: { type: Number, default: 1 },
    /** The subdivision level of the shape. */
    [detail]: { type: Number, default: 0, validator: Number.isInteger },
  },
  computed: {
    /** The THREE.PolyhedronGeometry instance. */
    [inst]() {
      return new PolyhedronGeometry(this[vertices], this[indices], this[radius], this[detail]);
    },
  },
};
