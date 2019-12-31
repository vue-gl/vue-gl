import { Mesh } from 'three';
import { VglObject3dWithMatarialAndGeometry } from '../mixins';
import { name, names } from '../types';
import { validateName, validateNames } from '../validators';

/**
 * A component representing triangular polygon mesh based objects,
 * corresponding [THREE.Mesh](https://threejs.org/docs/index.html#api/objects/Mesh).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  props: {
    /** Name of the geometry, defining the object's structure. */
    geometry: { type: name, validator: validateName },
    /**
     * A Material name or an array of Material name, defining the object's appearance.
     *
     * A single material will apply the material to all object's faces meanwhile
     * an array of material will apply each material to the matching index object's face
     */
    material: { type: names, validator: validateNames },
  },
  computed: {
    /** The THREE.Mesh instance. */
    inst: () => new Mesh(),
  },
};
