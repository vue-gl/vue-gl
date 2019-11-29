import { Path } from 'three';
import VglCurvePath from './vgl-curve-path';
import { vector2Array } from '../validators';
import { parseVector2Array } from '../parsers';

export default {
  mixins: [VglCurvePath],
  props: {
    path: vector2Array,
  },
  computed: {
    /** The THREE.Path instance. */
    inst() {
      const path = new Path();
      path.setFromPoints(parseVector2Array(this.path));
      return path;
    },
  },
};
