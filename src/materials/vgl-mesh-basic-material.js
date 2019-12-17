import { MeshBasicMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { string } from '../types';

/**
 * A material for drawing geometries in a simple shaded (flat or wireframe) way,
 * corresponding [THREE.MeshBasicMaterial](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial).
 * This material is not affected by lights.
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterialWithMap],
  props: {
    /** CSS style color of the material. */
    color: { type: string, default: '#fff' },
    /** The color map of the material. */
    map: string,
  },
  computed: {
    /** The THREE.MeshBasicMaterial instance. */
    inst: () => new MeshBasicMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { inst.color.setStyle(this.color); },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      this.update();
    },
  },
};
