import { LineDashedMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  color, dashSize, gapSize, inst, linewidth,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The material color. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** The line thickness. */
    [linewidth]: { type: Number, default: 1 },
    /** The dash size. */
    [dashSize]: { type: Number, default: 3 },
    /** The gap size. */
    [gapSize]: { type: Number, default: 1 },
  },
  computed: {
    /** The THREE.LineDashedMaterial instance. */
    [inst]: () => new LineDashedMaterial(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
    [linewidth]: { handler(w) { this[inst].linewidth = w; }, immediate: true },
    [dashSize]: { handler(s) { this[inst].dashSize = s; }, immediate: true },
    [gapSize]: { handler(s) { this[inst].gapSize = s; }, immediate: true },
  },
};
