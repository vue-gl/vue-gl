import { SpotLightHelper, Object3D } from 'three';
import VglObject3d from '../core/vgl-object3d';
import {
  add, change, color, inst, light, remove,
} from '../constants';
import { superMethod } from '../utilities';

export default {
  extends: VglObject3d,
  props: {
    /** If this is not the set the helper will take the color of the light. */
    [color]: [String, Number],
  },
  data: () => ({ lightUuid: null }),
  computed: {
    /** The THREE.SpotLightHelper instance. */
    [inst]() { return this.lightUuid ? new SpotLightHelper(this.light) : new Object3D(); },
  },
  methods: {
    [add](slot, obj) {
      if (slot === light) {
        this.light = obj;
        this.lightUuid = obj.uuid;
      } else superMethod(VglObject3d, add).call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === light) {
        if (this.light === obj) {
          delete this.light;
          this.lightUuid = null;
        }
      } else superMethod(VglObject3d, remove).call(this, slot, obj);
    },
    [change](slot) {
      if (slot === light) this[inst].update();
      superMethod(VglObject3d, change).call(this, slot);
    },
  },
  watch: {
    [inst](obj, { color: c }) { Object.assign(obj, { color: c }).update(); },
    [color]: {
      handler(c) { if (this.light) Object.assign(this[inst], { color: c }).update(); },
      immediate: true,
    },
  },
};
