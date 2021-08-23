import { MeshNormalMaterial } from 'three';
import { fog, inst } from '../constants';
import VglMaterial from './vgl-material';

export default {
  mixins: [VglMaterial],
  props: {
    /** Whether the material is affected by fog. */
    [fog]: Boolean,
  },
  computed: {
    /** The THREE.MeshNormalMaterial instance. */
    [inst]: () => new MeshNormalMaterial(),
  },
  watch: {
    [fog]: { handler(f) { this[inst].fog = f; }, immediate: true },
  },
};
