import { LineDashedMaterial } from 'three';
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
    /** The size of the dash. This is both the gap with the stroke. */
    dashSize: { type: number, default: 3 },
    /** The size of the gap. */
    gapSize: { type: number, default: 1 },
  },
  computed: {
    inst: () => new LineDashedMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          dashSize: parseFloat(this.dashSize),
          gapSize: parseFloat(this.gapSize),
          linewidth: parseFloat(this.linewidth),
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) { this.inst.color.setStyle(color); },
    linewidth(width) { this.inst.linewidth = parseFloat(width); },
    dashSize(dashSize) { this.inst.dashSize = parseFloat(dashSize); },
    gapSize(gapSize) { this.inst.gapSize = parseFloat(gapSize); },
  },
};
