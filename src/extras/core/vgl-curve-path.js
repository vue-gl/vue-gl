import { CurvePath } from 'three';
import VglCurve from './vgl-curve';
import { autoClose, inst } from '../../constants';

export default {
  extends: VglCurve,
  props: {
    /** Whether the path to be automatically closed or not. */
    [autoClose]: Boolean,
  },
  computed: {
    /** The THREE.CurvePath instance. */
    [inst]: () => new CurvePath(),
  },
  watch: {
    [inst](obj, { autoClose: a }) { Object.assign(obj, { autoClose: a }); },
    [autoClose]: { handler(a) { this.inst.autoClose = a; }, immediate: true },
  },
};
