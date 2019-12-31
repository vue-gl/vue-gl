import { MeshStandardMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { color, name } from '../types';
import { validateName } from '../validators';

/**
 * A standard physically based material,
 * corresponding [THREE.MeshStandardMaterial](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial).
 * Using Metallic-Roughness workflow.
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterialWithMap],
  props: {
    /** CSS style color of the material. */
    color: { type: color, default: '#fff' },
    /** The color map of the material. */
    map: { type: name, validator: validateName },
  },
  computed: {
    /** The THREE.MeshStandardMaterial instance. */
    inst: () => new MeshStandardMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { inst.color.setStyle(this.color); },
      immediate: true,
    },
    color(newColor) {
      this.inst.color.setStyle(newColor);
      this.update();
    },
  },
};
