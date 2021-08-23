import {
  BufferAttribute,
  StaticDrawUsage, DynamicDrawUsage, StreamDrawUsage,
  StaticReadUsage, DynamicReadUsage, StreamReadUsage,
  StaticCopyUsage, DynamicCopyUsage, StreamCopyUsage,
} from 'three';
import VglSlotable from './vgl-slotable';
import {
  array, inst, itemSize, name, normalized, usage,
} from '../../constants';

const usages = {
  staticDraw: StaticDrawUsage,
  staticRead: StaticReadUsage,
  staticCopy: StaticCopyUsage,
  dynamicDraw: DynamicDrawUsage,
  dynamicRead: DynamicReadUsage,
  dynamicCopy: DynamicCopyUsage,
  streamDraw: StreamDrawUsage,
  streamRead: StreamReadUsage,
  streamCopy: StreamCopyUsage,
};

export default {
  extends: VglSlotable,
  props: {
    /** The array of values to be stored in the buffer. */
    [array]: {
      type: Array,
      default: () => [],
      validator: (a) => a.every((e) => typeof e === 'number' || e instanceof Number),
    },
    /** An arbitrary name of the instance. */
    [name]: { default: '', type: String },
    /** Whether values to be normalized or not. */
    [normalized]: Boolean,
    /** The number of a value set. */
    [itemSize]: { required: true, type: Number, validator: Number.isInteger },
    /**
     * The usage pattern of the data store.
     * @values staticDraw, staticRead, staticCopy,
     *         dynamicDraw, dynamicRead, dynamicCopy,
     *         streamDraw, streamRead, streamCopy
     */
    [usage]: { default: 'staticDraw', type: String, validator: (u) => u in usages },
  },
  computed: {
    /** The THREE.BufferAttribute instance. */
    [inst]() { return new BufferAttribute(this.typedArray, this[itemSize]); },
    arrayLength() { return this.array.length; },
  },
  watch: {
    [array]: { handler(a) { this[inst].set(a); }, immediate: true },
    [normalized]: { handler(n) { this[inst].normalized = n; }, immediate: true },
    [usage]: { handler(u) { this[inst].setUsage(usages[u]); }, immediate: true },
    [name]: { handler(n) { this[inst].name = n; }, immediate: true },
    [inst](obj, { name: n, normalized: d, usage: u }) {
      Object.assign(obj, { name: n, normalized: d }).setUsage(u);
    },
  },
  render() {},
};
