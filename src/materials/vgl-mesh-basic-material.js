import { MeshBasicMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  add, color, inst, map, remove,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The material color. */
    [color]: { type: [String, Number], default: 0xffffff },
  },
  computed: {
    /** The THREE.MeshBasicMaterial instance. */
    [inst]: () => new MeshBasicMaterial(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
  },
  methods: {
    [add](slot, obj) { if (slot === map) this[inst].map = obj; },
    [remove](slot, obj) { if (slot === map && this[inst].map === obj) this[inst].map = null; },
  },
};
