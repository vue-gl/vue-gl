import { LineBasicMaterial } from 'three';
import VglMaterial from './vgl-material';
import { string, number, boolean } from '../validators';

/**
 * A material for drawing wireframe-style geometries,
 * corresponding [THREE.LineBasicMaterial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterial],
  props: {
    /** CSS style color of the material. */
    color: { type: string, default: '#fff' },
    /** A boolean whether the material is affected by lights. */
    lights: boolean,
    /** The line thickness. */
    linewidth: { type: number, default: 1 },
    /** Define appearance of line ends. Possible values are "butt", "round" and "square". */
    linecap: { type: string, default: 'round' },
    /** Define appearance of line joints. Possible values are "round", "bevel" and "miter". */
    linejoin: { type: string, default: 'round' },
  },
  computed: {
    inst: () => new LineBasicMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          lights: this.lights,
          linecap: this.linecap,
          linejoin: this.linejoin,
          linewidth: parseFloat(this.linewidth),
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) { this.inst.color.setStyle(color); },
    lights(lights) { this.inst.lights = lights; },
    linewidth(width) { this.inst.linewidth = parseFloat(width); },
    linecap(cap) { this.inst.linecap = cap; },
    linejoin(join) { this.inst.linejoin = join; },
  },
};
