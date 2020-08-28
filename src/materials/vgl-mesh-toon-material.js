import { MeshToonMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { color, name } from '../types';
import { validateName } from '../validators';

/**
 * An extension of the mesh phong material with toon shading,
 * corresponding [THREE.MeshToonMaterial](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial).
 *
 * Properties of [VglMeshPhongMaterial](vgl-mesh-phong-material) are also available as mixin.
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
    /** The THREE.MeshToonMaterial instance. */
    inst: () => new MeshToonMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(newColor) {
      this.inst.color.setStyle(newColor);
      this.update();
    },
  },
};
