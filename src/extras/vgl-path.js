import VglCurvePath from './vgl-curve-path';
import { Path } from '../three';

export default {
  mixins: [VglCurvePath],
  computed: {
    inst: () => new Path(),
  },
};
