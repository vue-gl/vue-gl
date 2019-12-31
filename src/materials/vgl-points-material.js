import { PointsMaterial } from 'three';
import VglMaterial from './vgl-material';
import { boolean, color, float } from '../types';

/**
 * The default material used by [VglPoints](vgl-points),
 * corresponding [THREE.PointsMaterial](https://threejs.org/docs/index.html#api/materials/PointsMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterial],
  props: {
    /** CSS style color of the material. */
    color: { type: color, default: '#fff' },
    /** The size of the points. */
    size: { type: float, default: 1 },
    /** Specify whether points' size will get smaller with the distance. */
    disableSizeAttenuation: boolean,
  },
  computed: {
    /** The THREE.PointsMaterial instance. */
    inst: () => new PointsMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          size: parseFloat(this.size),
          sizeAttenuation: !this.disableSizeAttenuation,
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(newColor) {
      this.inst.color.setStyle(newColor);
      this.update();
    },
    size(size) {
      this.inst.size = parseFloat(size);
      this.update();
    },
    disableSizeAttenuation(disabled) {
      this.inst.sizeAttenuation = !disabled;
      this.update();
    },
  },
};
