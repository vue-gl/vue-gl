import { BufferGeometry } from 'three';
import vglSlotable from './private/vgl-slotable';
import VglSlotHolder from './private/vgl-slot-holder';
import {
  add, drawRangeCount, drawRangeStart, groups, inst, name, remove,
} from '../constants';

/** A mesh, line, or point geometry representation. */
export default {
  mixins: [vglSlotable, VglSlotHolder],
  props: {
    /** An arbitrary name of the instance. */
    [name]: { type: String, default: '' },
    /** The start index of drawn part in the geometry. */
    [drawRangeStart]: { type: Number, default: 0, validator: Number.isInteger },
    /** The number of indices to be drawn. */
    [drawRangeCount]: {
      type: Number, default: Infinity, validator: (c) => Number.isInteger(c) || c === Infinity,
    },
    /** An array of objects those represent index groups to be rendered in separate draw calls. */
    [groups]: {
      type: Array,
      default: () => [],
      validator: (g) => g.every(
        ({ start, count, materialIndex }) => [start, count, materialIndex].every(Number.isInteger),
      ),
    },
  },
  computed: {
    /** The THREE.BufferGeometry instance. */
    [inst]: () => new BufferGeometry(),
    drawRange() { return [this[drawRangeStart], this[drawRangeCount]]; },
  },
  beforeDestroy() { this[inst].dispose(); },
  watch: {
    [name]: { handler(n) { this[inst].name = n; }, immediate: true },
    [groups]: {
      handler(gs) {
        this[inst].clearGroups();
        gs.forEach(({ start, count, materialIndex }) => {
          this[inst].addGroup(start, count, materialIndex);
        });
      },
      immediate: true,
    },
    [inst](newObj, prevObj) {
      const { name: n, drawRange: r, groups: g } = prevObj;
      Object.assign(newObj, { name: n }).setDrawRange(r.start, r.count);
      g.forEach(({ start, count, materialIndex }) => {
        newObj.addGroup(start, count, materialIndex);
      });
      prevObj.dispose();
    },
    drawRange: { handler(r) { this[inst].setDrawRange(...r); }, immediate: true },
  },
  methods: {
    [add](slot, obj) { this[inst].setAttribute(slot, obj); },
    [remove](slot, obj) {
      if (this[inst].getAttribute(slot) === obj) this[inst].deleteAttribute(slot);
    },
  },
  /**
   * Each attribute in a named slot will be added to the geometry with the same name as the slot.
   * @slot Any
   */
  render: undefined,
};
