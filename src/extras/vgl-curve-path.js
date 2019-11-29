import { CurvePath } from 'three';
import VglCurve from './vgl-curve';
import { boolean } from '../validators';

export default {
  mixins: [VglCurve],
  props: {
    autoClose: boolean,
  },
  computed: {
    inst: () => new CurvePath(),
  },
  watch: {
    inst: {
      handler(inst) { Object.assign(inst, { autoClose: this.autoClose }); },
      immediate: true,
    },
    autoClose(autoClose) { this.inst.autoClose = autoClose; },
  },
};
