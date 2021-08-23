import { Fog } from 'three';
import VglSlotable from '../core/private/vgl-slotable';
import {
  name, color, near, far, inst,
} from '../constants';

export default {
  mixins: [VglSlotable],
  props: {
    /** An arbitrary name of the instance. */
    [name]: { default: '', type: String },
    /** The fog color. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** The minimum distance that the fog to be applied. */
    [near]: { type: Number, default: 1 },
    /** The maximum distance that the fog to be applied. */
    [far]: { type: Number, default: 1000 },
  },
  computed: {
    /** The THREE.BufferAttribute instance. */
    [inst]: () => new Fog(),
  },
  watch: {
    [name]: { handler(n) { this[inst].name = n; }, immediate: true },
    [near]: { handler(n) { this[inst].near = n; }, immediate: true },
    [far]: { handler(f) { this[inst].far = f; }, immediate: true },
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
  },
  render() {},
};
