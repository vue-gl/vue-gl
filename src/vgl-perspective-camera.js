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
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
          fov: parseFloat(this.fov),
        });
      },
      immediate: true,
    },
    zoom(zoom) {
      this.inst.zoom = parseFloat(zoom);
      update(this);
    },
    near(near) {
      this.inst.near = parseFloat(near);
      update(this);
    },
    far(far) {
      this.inst.far = parseFloat(far);
      update(this);
    },
    fov(fov) {
      this.inst.fov = parseFloat(fov);
      update(this);
    },
  },
};
