import { MeshPhongMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { color, name, float } from '../types';
import { validateName } from '../validators';

/**
 * A material for shiny surfaces with specular highlights,
 * corresponding [THREE.MeshPhongMaterial](https://threejs.org/docs/index.html#api/materials/MeshPhongMaterial).
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
    /** Specular color of the material. */
    specular: { type: color, default: '#111111' },
    /** How shiny the specular highlight is. A higher value gives a sharper highlight. */
    shininess: { type: float, default: 30 },
  },
  computed: {
    /** The THREE.MeshPhongMaterial instance. */
    inst: () => new MeshPhongMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          shininess: parseFloat(this.shininess),
        });
        inst.specular.setStyle(this.specular);
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(newColor) {
      this.inst.color.setStyle(newColor);
      this.update();
    },
    specular(specular) {
      this.inst.specular.setStyle(specular);
      this.update();
    },
    shininess(shininess) {
      this.inst.shininess = parseFloat(shininess);
      this.update();
    },
  },
};
