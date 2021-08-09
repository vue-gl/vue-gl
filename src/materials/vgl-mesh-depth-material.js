import { MeshDepthMaterial } from 'three';
import VglMaterial from './vgl-material';
import {
  add, fog, inst, map, remove,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** Whether the material is affected by fog. */
    [fog]: Boolean,
  },
  computed: {
    /** The THREE.MeshDepthMaterial instance. */
    [inst]: () => new MeshDepthMaterial(),
  },
  watch: {
    [fog]: { handler(f) { this[inst].fog = f; }, immediate: true },
  },
  methods: {
    [add](slot, obj) { if (slot === map) this[inst].map = obj; },
    [remove](slot, obj) { if (slot === map && this[inst].map === obj) this[inst].map = null; },
  },
};
