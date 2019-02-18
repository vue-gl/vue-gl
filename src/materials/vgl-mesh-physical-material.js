import { MeshPhysicalMaterial } from 'three';
import VglMeshStandardMaterial from './vgl-mesh-standard-material';
import { number } from '../validators';

/**
 * An extension of the mesh standard material that allows for greater control over reflectivity,
 * corresponding [THREE.MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/materials/MeshPhysicalMaterial).
 *
 * Properties of [VglMeshStandardMaterial](vgl-mesh-standard-material) are also available as mixin.
 */

export default {
  mixins: [VglMeshStandardMaterial],
  props: {
    /** ClearCoat level, from 0.0 to 1.0. */
    clearCoat: { type: number, default: 0 },
    /** How rough the clearCoat appears, from 0.0 to 1.0. */
    clearCoatRoughness: { type: number, default: 0 },
    /** Degree of reflectivity, from 0.0 to 1.0. */
    reflectivity: { type: number, default: 0.5 },
  },
  computed: {
    inst: () => new MeshPhysicalMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          clearCoat: parseFloat(this.clearCoat),
          clearCoatRoughness: parseFloat(this.clearCoatRoughness),
          reflectivity: parseFloat(this.reflectivity),
        });
      },
      immediate: true,
    },
    clearCoat(clearCoat) { this.inst.clearCoat = parseFloat(clearCoat); },
    clearCoatRoughness(roughness) { this.inst.clearCoatRoughness = parseFloat(roughness); },
    reflectivity(reflectivity) { this.inst.reflectivity = parseFloat(reflectivity); },
  },
};
