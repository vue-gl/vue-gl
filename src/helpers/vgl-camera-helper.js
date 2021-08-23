import { CameraHelper, LineSegments } from 'three';
import VglLineSegments from '../objects/vgl-line-segments';
import {
  add, camera, inst, remove,
} from '../constants';
import { superMethod } from '../utilities';

export default {
  extends: VglLineSegments,
  data: () => ({ camera: null }),
  computed: {
    /** The THREE.CameraHelper instance. */
    [inst]() { return this.camera ? new CameraHelper(this.camera) : new LineSegments(); },
  },
  methods: {
    [add](slot, obj) {
      if (slot === camera) this.camera = obj;
      else superMethod(VglLineSegments, add).call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === camera) {
        if (this.camera === obj) this.camera = null;
      } else superMethod(VglLineSegments, remove).call(this, slot, obj);
    },
  },
};
