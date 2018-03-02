import VglCurvePath from './vgl-curve-path.js';
import { Path } from '../three.js';

export default {
  mixins: [VglCurvePath],
  computed: {
    inst: () => new Path(),
  },
};
