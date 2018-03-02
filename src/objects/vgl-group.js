import VglObject3d from '../core/vgl-object3d.js';
import { Group } from '../three.js';

/**
 * A component for grouping objects,
 * corresponding [THREE.Group](https://threejs.org/docs/index.html#api/objects/Group).
 * Its purpose is to make working with groups of objects syntactically clearer.
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  computed: {
    inst: () => new Group(),
  },
};
