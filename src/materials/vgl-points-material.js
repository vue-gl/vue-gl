import { PointsMaterial } from 'three';
import VglMaterial from './vgl-material';
import { string, number, boolean } from '../validators';

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
    color: { type: string, default: '#fff' },
    /** The size of the points. */
    size: { type: number, default: 1 },
    /** Specify whether points' size will get smaller with the distance. */
    disableSizeAttenuation: boolean,
  },
  computed: {
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
    color(color) {
      this.inst.color.setStyle(color);
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
