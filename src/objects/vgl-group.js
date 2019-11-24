import { Group } from 'three';
import VglObject3d from '../core/vgl-object3d';

/**
 * A component for grouping objects,
 * corresponding [THREE.Group](https://threejs.org/docs/index.html#api/objects/Group).
 * Its purpose is to make working with groups of objects syntactically clearer.
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  computed: {
    /** The THREE.Group instance. */
    inst: () => new Group(),
  },
};
