import { SpriteMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { name, color } from '../types';
import { validateName } from '../validators';

/**
 * A material for a use with a [VglSprite](vgl-sprite) component,
 * corresponding [THREE.SpriteMaterial](https://threejs.org/docs/index.html#api/materials/SpriteMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterialWithMap],
  props: {
    /** CSS style color of the material. */
    color: { type: color, default: '#fff' },
    /** The texture map of the material. */
    map: { type: name, validator: validateName },
  },
  computed: {
    /** The THREE.SpriteMaterial instance. */
    inst: () => new SpriteMaterial(),
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
