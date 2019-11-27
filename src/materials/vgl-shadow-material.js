import { ShadowMaterial } from 'three';
import VglMaterial from './vgl-material';

/**
 * This material can receive shadows but otherwise is completely transparent,
 * corresponding [THREE.ShadowMaterial](https://threejs.org/docs/index.html#api/materials/ShadowMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterial],
  computed: {
    /** The THREE.ShadowMaterial instance. */
    inst: () => new ShadowMaterial(),
  },
};
