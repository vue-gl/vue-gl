import VglCamera from './vgl-camera.js';
import { PerspectiveCamera } from './three.js';
import { update, validatePropNumber } from './utils.js';

export default {
  mixins: [VglCamera],
  props: {
    zoom: { type: validatePropNumber, default: 1 },
    near: { type: validatePropNumber, default: 0.1 },
    far: { type: validatePropNumber, default: 2000 },
    fov: { type: validatePropNumber, default: 50 },
  },
  computed: {
    inst: () => new PerspectiveCamera(),
  },
  watch: {
    zoom: {
      handler(zoom) {
        this.inst.zoom = parseFloat(zoom);
        update(this);
      },
      immediate: true,
    },
    near: {
      handler(near) {
        this.inst.near = parseFloat(near);
        update(this);
      },
      immediate: true,
    },
    far: {
      handler(far) {
        this.inst.far = parseFloat(far);
        update(this);
      },
      immediate: true,
    },
    fov: {
      handler(fov) {
        this.inst.fov = parseFloat(fov);
        update(this);
      },
      immediate: true,
    },
  },
};
