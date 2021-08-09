import { MeshPhysicalMaterial } from 'three';
import VglMeshStandardMaterial from './vgl-mesh-standard-material';
import {
  clearcoat, clearcoatRoughness, inst, reflectivity,
} from '../constants';

export default {
  mixins: [VglMeshStandardMaterial],
  props: {
    /** ClearCoat level, from 0.0 to 1.0. */
    [clearcoat]: { type: Number, default: 0, validator: (v) => v >= 0 && v <= 1 },
    /** How rough the clearCoat appears, from 0.0 to 1.0. */
    [clearcoatRoughness]: { type: Number, default: 0, validator: (v) => v >= 0 && v <= 1 },
    /** Degree of reflectivity, from 0.0 to 1.0. */
    [reflectivity]: { type: Number, default: 0.5, validator: (v) => v >= 0 && v <= 1 },
  },
  computed: {
    /** The THREE.MeshPhysicalMaterial instance. */
    [inst]: () => new MeshPhysicalMaterial(),
  },
  watch: {
    [clearcoat]: { handler(c) { this[inst].clearcoat = c; }, immediate: true },
    [clearcoatRoughness]: { handler(r) { this[inst].clearcoatRoughness = r; }, immediate: true },
    [reflectivity]: { handler(r) { this[inst].reflectivity = r; }, immediate: true },
  },
};
