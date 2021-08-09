import { LatheGeometry, Vector2 } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  inst, phiLength, phiStart, points, segments,
} from '../constants';

function isNumber(number) { return typeof number === 'number' || number instanceof Number; }

function chunk(array) {
  return array.reduce((acc, value, index) => {
    if (index % 2) acc[acc.length - 1].push(value);
    else acc.push([value]);
    return acc;
  }, []);
}

export default {
  extends: VglGeometry,
  props: {
    /**
     * An array of values or an array of pairs of values.
     * [x1, y1, x2, y2, x3, y3, ...] or [[x1, y1], [x2, y2], [x3, y3], ...]
     */
    [points]: {
      type: Array,
      default: () => [],
      validator: (pts) => (pts.every(isNumber) && !(pts.length % 2))
        || pts.every((pair) => Array.isArray(pair) && pair.length === 2 && pair.every(isNumber)),
    },
    /** The number of circumference segments to generate. */
    [segments]: { type: Number, default: 12, validator: Number.isInteger },
    /** The starting angle in radians. */
    [phiStart]: { type: Number, default: 0 },
    /** The radian (0 to 2PI) range of the lathed section. */
    [phiLength]: { type: Number, default: Math.PI * 2 },
  },
  computed: {
    [inst]() {
      return new LatheGeometry(
        chunk(this[points].flat()).map(([x, y]) => new Vector2(x, y)),
        this[segments], this[phiStart], this[phiLength],
      );
    },
  },
};
