import { MeshDepthMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { string, boolean } from '../validators';

/**
 * A material for drawing geometry by depth,
 * corresponding [THREE.MeshDepthMaterial](https://threejs.org/docs/index.html#api/materials/MeshDepthMaterial).
 * This material is not affected by lights.
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterialWithMap],
  props: {
    /** Whether the material is affected by fog. */
    fog: boolean,
    /** The color map of the material. */
    map: string,
  },
  computed: {
    inst: () => new MeshDepthMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { Object.assign(inst, { fog: this.fog }); },
      immediate: true,
    },
    fog(fog) {
      this.inst.fog = fog;
      this.update();
    },
  },
};
