import { HemisphereLight } from 'three';
import VglLight from './vgl-light';
import { groundColor, inst } from '../constants';

export default {
  extends: VglLight,
  props: {
    /** The ground color */
    [groundColor]: { type: [String, Number], default: 0xffffff },
  },
  computed: {
    /** The THREE.HemisphereLight instance. */
    [inst]: () => new HemisphereLight(),
  },
  watch: {
    [groundColor]: { handler(c) { this[inst].groundColor.set(c); }, immediate: true },
  },
};
