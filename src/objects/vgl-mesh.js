import { Mesh } from 'three';
import { VglObject3dWithMatarialAndGeometry } from '../mixins';
import { string, names } from '../validators';

/**
 * A component representing triangular polygon mesh based objects,
 * corresponding [THREE.Mesh](https://threejs.org/docs/index.html#api/objects/Mesh).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  props: {
    /** Name of the geometry, defining the object's structure. */
    geometry: string,
    /**
     * A Material name or an array of Material name, defining the object's appearance.
     *
     * A single material will apply the material to all object's faces meanwhile
     * an array of material will apply each material to the matching index object's face
     */
    material: names,
  },
  computed: {
    inst: () => new Mesh(),
  },
};
