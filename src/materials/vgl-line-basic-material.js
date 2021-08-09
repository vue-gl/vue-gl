import { LineBasicMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  color, inst, linecap, linejoin, linewidth,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The material color. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** The line thickness. */
    [linewidth]: { type: Number, default: 1 },
    /**
     * The appearance of line ends.
     * @values butt, round, square
     */
    [linecap]: {
      type: String, default: 'round', validator: (v) => ['butt', 'round', 'square'].includes(v),
    },
    /**
     * The appearance of line joints.
     * @values round, bevel, miter
     */
    [linejoin]: {
      type: String, default: 'round', validator: (v) => ['round', 'bevel', 'miter'].includes(v),
    },
  },
  computed: {
    /** The THREE.LineBasicMaterial instance. */
    [inst]: () => new LineBasicMaterial(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
    [linewidth]: { handler(w) { this[inst].linewidth = w; }, immediate: true },
    [linecap]: { handler(c) { this[inst].linecap = c; }, immediate: true },
    [linejoin]: { handler(j) { this[inst].linejoin = j; }, immediate: true },
  },
};
