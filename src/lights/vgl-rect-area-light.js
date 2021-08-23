import { RectAreaLight } from 'three';
import VglLight from './vgl-light';
import { height, inst, width } from '../constants';

export default {
  extends: VglLight,
  props: {
    /** The width of the lighting plane. */
    [width]: { type: Number, default: 10 },
    /** The height of the lighting plane. */
    [height]: { type: Number, default: 10 },
  },
  computed: {
    /** The THREE.RectAreaLight instance. */
    [inst]: () => new RectAreaLight(),
  },
  watch: {
    [width]: { handler(w) { this[inst].width = w; }, immediate: true },
    [height]: { handler(h) { this[inst].height = h; }, immediate: true },
  },
};
