import { VglObject3dWithMatarial } from '../mixins.js';
import { Sprite } from '../three.js';
import { string } from '../validators.js';

/**
 * A sprite component corresponding [THREE.Sprite](https://threejs.org/docs/index.html#api/objects/Sprite).
 * It is a plane that always faces towards the camera.
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3dWithMatarial],
  props: {
    /** Name of the material, defining the object's appearance. */
    material: string,
  },
  computed: {
    inst: () => new Sprite(),
  },
};
