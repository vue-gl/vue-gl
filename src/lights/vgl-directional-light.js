import { DirectionalLight } from 'three';
import VglLight from './vgl-light';

/**
 * A light that gets emitted in a specific direction, corresponding [THREE.DirectionalLight](https://threejs.org/docs/index.html#api/lights/DirectionalLight). This light will behave as though it is infinitely far away and the rays produced from it are all parallel. This light can cast shadows.
 *
 * Properties of [VglLight](vgl-light) are also available as mixin.
 */

export default {
  mixins: [VglLight],
  computed: {
    /** The THREE.DirectionalLight instance. */
    inst: () => new DirectionalLight(),
  },
};
