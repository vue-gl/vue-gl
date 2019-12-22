import { MeshLambertMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { name, color } from '../types';
import { validateName } from '../validators';

/**
 * A material for non-shiny surfaces, without specular highlights,
 * corresponding [THREE.MeshLambertMaterial](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial).
 *
 * The material uses a non-physically based Lambertian model for calculating reflectance. This can
 * simulate some surfaces (such as untreated wood or stone) well, but cannot simulate shiny surfaces
 * with specular highlights (such as varnished wood).
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
    /** The THREE.MeshLambertMaterial instance. */
    inst: () => new MeshLambertMaterial(),
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
