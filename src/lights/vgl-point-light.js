import { PointLight } from 'three';
import VglLight from './vgl-light';
import { decay, distance, inst } from '../constants';

export default {
  extends: VglLight,
  props: {
    /** The maximum distance where the light reaches. The light never stops when set to 0. */
    [distance]: { type: Number, default: 0 },
    /** The dim amount along the distance from the light. */
    [decay]: { type: Number, default: 1 },
  },
  computed: {
    /** The THREE.PointLight instance. */
    [inst]: () => new PointLight(),
  },
  watch: {
    [distance]: { handler(d) { this[inst].distance = d; }, immediate: true },
    [decay]: { handler(d) { this[inst].decay = d; }, immediate: true },
  },
};
