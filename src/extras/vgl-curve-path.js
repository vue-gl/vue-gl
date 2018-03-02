import VglCurve from './vgl-curve.js';
import { CurvePath } from '../three.js';

export default {
  mixins: [VglCurve],
  computed: {
    inst: () => new CurvePath(),
  },
};
