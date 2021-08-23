import { MeshPhongMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  add, color, inst, map, remove, shininess, specular,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The material color. */
    [color]: { type: [String, Number], default: 0xffffff },
    /** The specular color. */
    [specular]: { type: [String, Number], default: 0x111111 },
    /** The specular highlight shininess. */
    [shininess]: { type: Number, default: 30 },
  },
  computed: {
    /** The THREE.MeshPhongMaterial instance. */
    [inst]: () => new MeshPhongMaterial(),
  },
  watch: {
    [color]: { handler(c) { this[inst].color.set(c); }, immediate: true },
    [specular]: { handler(s) { this[inst].specular.set(s); }, immediate: true },
    [shininess]: { handler(s) { this[inst].shininess = s; }, immediate: true },
  },
  methods: {
    [add](slot, obj) { if (slot === map) this[inst].map = obj; },
    [remove](slot, obj) { if (slot === map && this[inst].map === obj) this[inst].map = null; },
  },
};
