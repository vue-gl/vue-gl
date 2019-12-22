import { Path } from 'three';
import VglCurvePath from './vgl-curve-path';
import { vector2Array } from '../types';
import { parseVector2Array } from '../parsers';
import { validateVector2Array } from '../validators';

/**
 * A 2D path representation, Corresponding
 * [THREE.Path](https://threejs.org/docs/index.html#api/extras/core/Path).
 *
 * Properties of [VglCurvePath](vgl-curve-path) are also available as mixin.
 */

export default {
  mixins: [VglCurvePath],
  props: {
    /** The array of points as a LineCurve. */
    path: { type: vector2Array, validator: validateVector2Array },
  },
  computed: {
    /** The THREE.Path instance. */
    inst() {
      const path = new Path();
      if (this.path !== undefined) path.setFromPoints(parseVector2Array(this.path));
      return path;
    },
  },
};
