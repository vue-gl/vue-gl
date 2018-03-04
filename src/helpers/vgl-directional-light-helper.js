import VglObject3d from '../core/vgl-object3d.js';
import { DirectionalLightHelper } from '../three.js';
import { string, number } from '../validators.js';

/**
 * A helper component to assist with visualizing a DirectionalLight's effect on the scene,
 * corresponding [THREE.DirectionalLightHelper](https://threejs.org/docs/index.html#api/helpers/DirectionalLightHelper).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** If this is not the set the helper will take the color of the light. */
    color: { type: string },
    /** Dimensions of the plane. */
    size: { type: number, default: 1 },
  },
  computed: {
    inst() { return new DirectionalLightHelper(this.vglObject3d.inst, parseFloat(this.size)); },
  },
  watch: {
    inst: {
      handler(inst) {
        if (this.color) {
          Object.assign(inst, { color: this.color });
          inst.update();
        }
      },
      immediate: true,
    },
    color(color) {
      this.inst.color = color;
      this.inst.update();
    },
  },
};
