import { LineBasicMaterial } from 'three';
import VglMaterial from './vgl-material';
import { string, color, float } from '../types';

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
    color: { type: color, default: '#fff' },
    /** The line thickness. */
    linewidth: { type: float, default: 1 },
    /** Define appearance of line ends. Possible values are "butt", "round" and "square". */
    linecap: { type: string, default: 'round', validator: (v) => /^(butt|round|square)$/.test(v) },
    /** Define appearance of line joints. Possible values are "round", "bevel" and "miter". */
    linejoin: { type: string, default: 'round', validator: (v) => /^(round|bevel|miter)$/.test(v) },
  },
  computed: {
    /** The THREE.LineBasicMaterial instance. */
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
    color(newColor) {
      this.inst.color.setStyle(newColor);
      this.update();
    },
    linewidth(width) {
      this.inst.linewidth = parseFloat(width);
      this.update();
    },
    linecap(cap) {
      this.inst.linecap = cap;
      this.update();
    },
    linejoin(join) {
      this.inst.linejoin = join;
      this.update();
    },
  },
};
