import { Shape } from 'three';
import VglPath from './vgl-path';
import { parseVector2Array } from '../parsers';

/**
 * Defines an arbitrary 2d shape plane using paths with optional holes. It can be used with
 * VglExtrudeGeometry to get points, or to get triangulated faces. Corresponding
 * [THREE.Shape](https://threejs.org/docs/index.html#api/extras/core/Shape).
 *
 * Properties of [VglPath](vgl-path) are also available as mixin.
 */

export default {
  mixins: [VglPath],
  computed: {
    /** The THREE.Shape instance. */
    inst() {
      const shape = new Shape();
      if (this.path !== undefined) shape.setFromPoints(parseVector2Array(this.path));
      return shape;
    },
  },
};
