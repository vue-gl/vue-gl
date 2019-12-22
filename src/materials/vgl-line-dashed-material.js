import { LineDashedMaterial } from 'three';
import VglMaterial from './vgl-material';
import { color, float } from '../types';

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
    /** The size of the dash. This is both the gap with the stroke. */
    dashSize: { type: float, default: 3 },
    /** The size of the gap. */
    gapSize: { type: float, default: 1 },
  },
  computed: {
    /** The THREE.LineDashedMaterial instance. */
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
    color(newColor) {
      this.inst.color.setStyle(newColor);
      this.update();
    },
    linewidth(width) {
      this.inst.linewidth = parseFloat(width);
      this.update();
    },
    dashSize(dashSize) {
      this.inst.dashSize = parseFloat(dashSize);
      this.update();
    },
    gapSize(gapSize) {
      this.inst.gapSize = parseFloat(gapSize);
      this.update();
    },
  },
};
