import { Object3D, SpotLight } from 'three';
import VglLight from './vgl-light';
import {
  add, angle, decay, distance, inst, penumbra, remove, target,
} from '../constants';
import { superMethod } from '../utilities';

export default {
  extends: VglLight,
  props: {
    /** The maximum distance where the light reaches. The light never stops when set to 0. */
    [distance]: { type: Number, default: 0 },
    /** The dim amount along the distance from the light. */
    [decay]: { type: Number, default: 1 },
    /** The maximum extent of the spotlight in radians. */
    [angle]: { type: Number, default: Math.PI / 3, validator: (a) => a >= 0 && a <= Math.PI / 2 },
    /** The percentage of the spotlight cone that is attenuated due to penumbra. */
    [penumbra]: { type: Number, default: 0, validator: (n) => n >= 0 && n <= 1 },
  },
  computed: {
    /** The THREE.SpotLight instance. */
    [inst]: () => new SpotLight(),
  },
  watch: {
    [distance]: { handler(d) { this[inst].distance = d; }, immediate: true },
    [decay]: { handler(d) { this[inst].decay = d; }, immediate: true },
    [angle]: { handler(a) { this[inst].angle = a; }, immediate: true },
    [penumbra]: { handler(p) { this[inst].penumbra = p; }, immediate: true },
  },
  methods: {
    [add](slot, obj) {
      if (slot === target) this[inst].target = obj;
      else superMethod(VglLight, add).call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === target) {
        if (this[inst].target === obj) this[inst].target = new Object3D();
      } else superMethod(VglLight, remove).call(this, slot, obj);
    },
  },
};
