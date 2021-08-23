import { PlaneGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  height, heightSegments, inst, width, widthSegments,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The width of the plane along the X axis. */
    [width]: { type: Number, default: 1 },
    /** The height of the plane along the Y axis. */
    [height]: { type: Number, default: 1 },
    /** The number of width segments along the X axis. */
    [widthSegments]: { type: Number, default: 1, validator: Number.isInteger },
    /** The number of height segments along the Y axis. */
    [heightSegments]: { type: Number, default: 1, validator: Number.isInteger },
  },
  computed: {
    /** The THREE.PlaneGeometry instance. */
    [inst]() {
      return new PlaneGeometry(
        this[width], this[height], this[widthSegments], this[heightSegments],
      );
    },
  },
};
