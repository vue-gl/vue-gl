import VglLight from './vgl-light.js';
import { AmbientLight } from '../three.js';

/**
 * A light component globally illuminates all objects in the scene equally,
 * corresponding [THREE.AmbientLight](https://threejs.org/docs/index.html#api/lights/AmbientLight).
 * This light cannot be used to cast shadows as it does not have a direction.
 *
 * Properties of [VglLight](vgl-light) are also available as mixin.
 */

export default {
  mixins: [VglLight],
  computed: {
    inst: () => new AmbientLight(),
  },
};
