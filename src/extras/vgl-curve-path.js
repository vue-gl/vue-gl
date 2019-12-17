import { CurvePath } from 'three';
import VglCurve from './vgl-curve';
import { boolean } from '../types';

/**
 * An abstract base component extending VglCurve, Corresponding
 * [THREE.CurvePath](https://threejs.org/docs/index.html#api/extras/core/CurvePath).
 *
 * Properties of [VglCurve](vgl-curve) are also available as mixin.
 */

export default {
  mixins: [VglCurve],
  props: {
    /** Whether or not to automatically close the path. */
    autoClose: boolean,
  },
  computed: {
    /** The THREE.CurvePath instance. */
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
