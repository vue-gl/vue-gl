import { Points } from 'three';
import { VglObject3dWithMatarialAndGeometry } from '../mixins';
import { string } from '../validators';

/**
 * A component for displaying points,
 * corresponding [THREE.Points](https://threejs.org/docs/index.html#api/objects/Points).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  props: {
    /** Name of the geometry, defining the object's structure. */
    geometry: string,
    /** Name of the material, defining the object's appearance. */
    material: string,
  },
  computed: {
    inst: () => new Points(),
  },
};
