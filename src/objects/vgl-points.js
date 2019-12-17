import { Points } from 'three';
import { VglObject3dWithMatarialAndGeometry } from '../mixins';
import { name } from '../types';
import { nameValidator } from '../validators';

/**
 * A component for displaying points,
 * corresponding [THREE.Points](https://threejs.org/docs/index.html#api/objects/Points).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  props: {
    /** Name of the geometry, defining the object's structure. */
    geometry: { type: name, validator: nameValidator },
    /** Name of the material, defining the object's appearance. */
    material: { type: name, validator: nameValidator },
  },
  computed: {
    /** The THREE.Points instance. */
    inst: () => new Points(),
  },
};
