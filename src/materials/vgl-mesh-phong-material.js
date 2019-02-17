import { VglMaterialWithMap } from '../mixins';
import { MeshPhongMaterial } from '../three';
import { string, number } from '../validators';

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
    color: { type: string, default: '#fff' },
    /** The color map of the material. */
    map: string,
    /** Specular color of the material. */
    specular: { type: string, default: '#111111' },
    /** How shiny the specular highlight is. A higher value gives a sharper highlight. */
    shininess: { type: number, default: 30 },
  },
  computed: {
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
    color(color) { this.inst.color.setStyle(color); },
    specular(specular) { this.inst.specular.setStyle(specular); },
    shininess(shininess) { this.inst.shininess = parseFloat(shininess); },
  },
};
