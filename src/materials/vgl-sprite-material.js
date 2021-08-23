import { SpriteMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  add, alphaMap, color, inst, map, remove, rotation,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The material color multiplication. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** The sprite rotation in radians. */
    [rotation]: { type: Number, default: 0 },
  },
  computed: {
    /** The THREE.SpriteMaterial instance. */
    [inst]: () => new SpriteMaterial(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
    [rotation]: { handler(r) { this[inst].rotation = r; }, immediate: true },
  },
  methods: {
    [add](slot, obj) {
      if (slot === map) this[inst].map = obj;
      else if (slot === alphaMap) this[inst].alphaMap = obj;
    },
    [remove](slot, obj) {
      if (slot === map) {
        if (this[inst].map === obj) this[inst].map = null;
      } else if (slot === alphaMap && this[inst].alphaMap === obj) this[inst].alphaMap = null;
    },
  },
};
