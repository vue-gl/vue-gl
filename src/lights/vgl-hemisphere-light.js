import VglLight from './vgl-light.js';
import { HemisphereLight } from '../three.js';
import { string } from '../validators.js';

/**
 * A light source positioned directly above the scene, with color fading from the sky color to the
 * ground color, corresponding [THREE.HemisphereLight](https://threejs.org/docs/index.html#api/lights/HemisphereLight).
 * This light cannot be used to cast shadows.
 *
 * Properties of [VglLight](vgl-light) are also available as mixin.
 */

export default {
  mixins: [VglLight],
  props: {
    groundColor: { type: string, default: '#fff' },
  },
  computed: {
    inst: () => new HemisphereLight(),
  },
  watch: {
    inst: {
      handler(inst) { inst.groundColor.setStyle(this.groundColor); },
      immediate: true,
    },
    groundColor(groundColor) { this.inst.groundColor.setStyle(groundColor); },
  },
};
