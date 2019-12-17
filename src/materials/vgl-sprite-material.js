import { SpriteMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { string, name } from '../types';
import { nameValidator } from '../validators';

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
    color: { type: string, default: '#fff' },
    /** The texture map of the material. */
    map: { type: name, validator: nameValidator },
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
    color(color) {
      this.inst.color.setStyle(color);
      this.update();
    },
  },
};
