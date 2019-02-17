import VglCurve from './vgl-curve';
import { CurvePath } from '../three';

export default {
  mixins: [VglCurve],
  computed: {
    inst: () => new CurvePath(),
  },
};
