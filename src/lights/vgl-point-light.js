import { PointLight } from 'three';
import VglLight from './vgl-light';
import { float } from '../types';

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
    distance: { type: float, default: 0 },
    /**
     * The amount the light dims along the distance of the light.
     * For physically correct lighting, set this to 2.
     */
    decay: { type: float, default: 1 },
  },
  computed: {
    /** The THREE.PointLight instance. */
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
    distance(distance) {
      this.inst.distance = parseFloat(distance);
      this.vglObject3d.emit();
    },
    decay(decay) {
      this.inst.decay = parseFloat(decay);
      this.vglObject3d.emit();
    },
  },
};
