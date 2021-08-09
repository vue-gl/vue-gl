import { PolarGridHelper } from 'three';
import VglLineSegments from '../objects/vgl-line-segments';
import {
  circles, color1, color2, divisions, inst, radials, radius,
} from '../constants';

export default {
  extends: VglLineSegments,
  props: {
    /** The radius of the grid. */
    [radius]: { type: Number, default: 10 },
    /** The number of radial lines. */
    [radials]: { type: Number, default: 16, validator: Number.isInteger },
    /** The number of circle lines. */
    [circles]: { type: Number, default: 8, validator: Number.isInteger },
    /** The number of line segments for each circle. */
    [divisions]: { type: Number, default: 64, validator: Number.isInteger },
    /** The first line color. */
    [color1]: { type: [String, Number], default: 0x444444 },
    /** The second line color. */
    [color2]: { type: [String, Number], default: 0x888888 },
  },
  computed: {
    /** The THREE.PolarGridHelper instance. */
    [inst]() {
      return new PolarGridHelper(
        this[radius], this[radials], this[circles], this[divisions], this[color1], this[color2],
      );
    },
  },
};
