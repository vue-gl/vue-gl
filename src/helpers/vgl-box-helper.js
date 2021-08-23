import { BoxHelper } from 'three';
import VglLineSegments from '../objects/vgl-line-segments';
import {
  add, color, inst, object, remove, change,
} from '../constants';
import { superMethod } from '../utilities';

export default {
  extends: VglLineSegments,
  props: {
    /** The color of box lines. */
    [color]: { type: [String, Number], default: 0xffff00 },
  },
  computed: {
    /** The THREE.BoxHelper instance. */
    [inst]: () => new BoxHelper(),
  },
  watch: {
    [color]: { handler(c) { this.inst.material.color.set(c); }, immediate: true },
  },
  methods: {
    [add](slot, obj) {
      if (slot === object) this.$nextTick(() => { this[inst].setFromObject(obj); });
      else superMethod(VglLineSegments, add).call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === object) {
        this.$nextTick(() => { if (this.object === obj) this[inst].object = undefined; });
      } else superMethod(VglLineSegments, remove).call(this, slot, obj);
    },
    [change](slot) {
      if (slot === object) this.$nextTick(() => { this[inst].update(); });
      else superMethod(VglLineSegments, change).call(this, slot);
    },
  },
  /**
   * @slot object
   */
  render: undefined,
};
