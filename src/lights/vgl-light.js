import { Light } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { color, intensity, inst } from '../constants';

export default {
  extends: VglObject3d,
  props: {
    /** The color of the light. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** Numeric value of the light's strength/intensity. */
    [intensity]: { type: Number, default: 1 },
  },
  computed: {
    /** The THREE.Light instance. */
    [inst]: () => new Light(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
    [intensity]: { handler(i) { this[inst].intensity = i; }, immediate: true },
  },
  beforeDestroy() { this[inst].dispose(); },
};
