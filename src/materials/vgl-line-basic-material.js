import { LineBasicMaterial } from 'three';
import VglMaterial from './vgl-material';
import { string, number } from '../validators';

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
          linecap: this.linecap,
          linejoin: this.linejoin,
          linewidth: parseFloat(this.linewidth),
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) { this.inst.color.setStyle(color); },
    linewidth(width) { this.inst.linewidth = parseFloat(width); },
    linecap(cap) { this.inst.linecap = cap; },
    linejoin(join) { this.inst.linejoin = join; },
  },
};
