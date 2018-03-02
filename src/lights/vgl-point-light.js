import VglLight from './vgl-light.js';
import { PointLight } from '../three.js';
import { number } from '../validators.js';

/**
 * A light that gets emitted from a single point in all directions, corresponding [THREE.PointLight](https://threejs.org/docs/index.html#api/lights/PointLight). A common use case for this is to replicate the light emitted from a bare lightbulb. This light can cast shadows.
 *
 * Properties of [VglLight](vgl-light) are also available as mixin.
 */

export default {
  mixins: [VglLight],
  props: {
    /**
     * The distance from the light where the intensity is 0.
     * When set to 0, then the light never stops.
     */
    distance: { type: number, default: 0 },
    /**
     * The amount the light dims along the distance of the light.
     * For physically correct lighting, set this to 2.
     */
    decay: { type: number, default: 1 },
  },
  computed: {
    inst: () => new PointLight(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay),
        });
      },
      immediate: true,
    },
    distance(distance) { this.inst.distance = parseFloat(distance); },
    decay(decay) { this.inst.decay = parseFloat(decay); },
  },
};
