import { CurvePath } from 'three';
import VglCurve from './vgl-curve';

export default {
  mixins: [VglCurve],
  computed: {
    inst: () => new CurvePath(),
  },
};
