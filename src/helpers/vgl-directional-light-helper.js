import { DirectionalLightHelper, Object3D } from 'three';
import VglObject3d from '../core/vgl-object3d';
import {
  add, color, inst, light, remove, size,
} from '../constants';

export default {
  extends: VglObject3d,
  props: {
    /** If this is not the set the helper will take the color of the light. */
    [color]: [String, Number],
    /** Dimensions of the plane. */
    [size]: { type: Number, default: 1 },
  },
  beforeDestroy() { this[inst].dispose(); },
  data: () => ({ light: null }),
  computed: {
    /** The THREE.DirectionalLightHelper instance. */
    [inst]() {
      return this.light ? new DirectionalLightHelper(this.light, this[size]) : new Object3D();
    },
  },
  methods: {
    [add](slot, obj) {
      if (slot === light) this.light = obj;
      else VglObject3d.methods[add].call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === light) {
        if (this.light === obj) this.light = null;
      } else VglObject3d.methods[remove].call(this, slot, obj);
    },
  },
  watch: {
    [inst](obj, { color: c }) { Object.assign(obj, { color: c }).update(); },
    [color]: {
      handler(c) {
        if (!this.light) return;
        this[inst].color = c;
        this[inst].update();
      },
      immediate: true,
    },
  },
};
