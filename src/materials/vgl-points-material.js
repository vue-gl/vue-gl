import { PointsMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  color, inst, noSizeAttenuation, size,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The material color. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** The size of points. */
    [size]: { type: Number, default: 1 },
    /** Whether far points to get rendered smaller. */
    [noSizeAttenuation]: Boolean,
  },
  computed: {
    /** The THREE.PointsMaterial instance. */
    [inst]: () => new PointsMaterial(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
    [size]: { handler(s) { this[inst].size = s; }, immediate: true },
    [noSizeAttenuation]: { handler(v) { this[inst].sizeAttenuation = !v; }, immediate: true },
  },
};
