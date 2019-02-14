import VglObject3d from '../core/vgl-object3d';
import { Light } from '../three';
import { string, number } from '../validators';

/**
 * Abstract mixin component for lights,
 * corresponding [THREE.Light](https://threejs.org/docs/index.html#api/lights/Light).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** CSS style color of the light. */
    color: { type: string, default: '#fff' },
    /** Numeric value of the light's strength/intensity. */
    intensity: { type: number, default: 1 },
  },
  computed: {
    inst: () => new Light(),
  },
  watch: {
    inst: {
      handler(inst) {
        inst.color.setStyle(this.color);
        Object.assign(inst, { intensity: parseFloat(this.intensity) });
      },
      immediate: true,
    },
    color(color) { this.inst.color.setStyle(color); },
    intensity(intensity) { this.inst.intensity = parseFloat(intensity); },
  },
};
