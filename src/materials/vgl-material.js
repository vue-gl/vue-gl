import {
  Material, FrontSide, BackSide, DoubleSide,
} from 'three';
import VglSlotable from '../core/private/vgl-slotable';
import VglSlotHolder from '../core/private/vgl-slot-holder';
import {
  defines, fog, inst, name, side, vertexColors,
} from '../constants';

const sides = { front: FrontSide, back: BackSide, double: DoubleSide };

export default {
  mixins: [VglSlotable, VglSlotHolder],
  props: {
    /** An arbitrary name of the instance. */
    [name]: { type: String, default: '' },
    /**
     * Defines which side of faces will be rendered.
     * @values front, back, double
     */
    [side]: { type: String, default: 'front', validator: (s) => s in sides },
    /** Defines whether vertex coloring is used. */
    [vertexColors]: Boolean,
    /** Custom defines to be injected into the shader. */
    [defines]: { type: Object, default: () => ({}) },
    /** Whether the material color is affected by global fog settings. */
    [fog]: Boolean,
  },
  computed: {
    /** The THREE.Material instance. */
    [inst]: () => new Material(),
  },
  watch: {
    [name]: { handler(n) { this[inst].name = n; }, immediate: true },
    [side]: { handler(s) { this[inst].side = sides[s]; }, immediate: true },
    [vertexColors]: { handler(c) { this[inst].vertexColors = c; }, immediate: true },
    [defines]: {
      handler(d) { Object.assign(this[inst], { defines: d, needsUpdate: true }); }, immediate: true,
    },
    [fog]: {
      handler(f) { Object.assign(this[inst], { fog: f, needsUpdate: true }); }, immediate: true,
    },
  },
  beforeDestroy() { this[inst].dispose(); },
};
