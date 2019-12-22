import { MeshPhysicalMaterial } from 'three';
import VglMeshStandardMaterial from './vgl-mesh-standard-material';
import { float } from '../types';

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
    clearcoat: { type: float, default: 0 },
    /** How rough the clearCoat appears, from 0.0 to 1.0. */
    clearcoatRoughness: { type: float, default: 0 },
    /** Degree of reflectivity, from 0.0 to 1.0. */
    reflectivity: { type: float, default: 0.5 },
  },
  computed: {
    /** The THREE.MeshPhysicalMaterial instance. */
    inst: () => new MeshPhysicalMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          clearcoat: parseFloat(this.clearcoat),
          clearcoatRoughness: parseFloat(this.clearcoatRoughness),
          reflectivity: parseFloat(this.reflectivity),
        });
      },
      immediate: true,
    },
    clearcoat(clearcoat) {
      this.inst.clearcoat = parseFloat(clearcoat);
      this.update();
    },
    clearcoatRoughness(roughness) {
      this.inst.clearcoatRoughness = parseFloat(roughness);
      this.update();
    },
    reflectivity(reflectivity) {
      this.inst.reflectivity = parseFloat(reflectivity);
      this.update();
    },
  },
};
