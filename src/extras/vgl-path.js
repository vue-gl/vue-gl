import { Path } from 'three';
import VglCurvePath from './vgl-curve-path';

export default {
  mixins: [VglCurvePath],
  computed: {
    inst: () => new Path(),
  },
};
