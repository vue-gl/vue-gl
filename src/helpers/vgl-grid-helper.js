import { GridHelper } from 'three';
import VglLineSegments from '../objects/vgl-line-segments';
import {
  colorCenterLine, colorGrid, divisions, inst, size,
} from '../constants';

export default {
  extends: VglLineSegments,
  props: {
    /** The size of the grid. */
    [size]: { type: Number, default: 10 },
    /** The number of grid divisions. */
    [divisions]: { type: Number, default: 10, validator: Number.isInteger },
    /** The color of the center line. */
    [colorCenterLine]: { type: [String, Number], default: 0x444444 },
    /** The color of grid lines. */
    [colorGrid]: { type: [String, Number], default: 0x888888 },
  },
  computed: {
    /** The THREE.GridHelper instance. */
    [inst]() {
      return new GridHelper(this[size], this[divisions], this[colorCenterLine], this[colorGrid]);
    },
  },
};
