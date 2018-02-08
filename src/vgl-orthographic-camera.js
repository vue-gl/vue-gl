import VglCamera from './vgl-camera.js';
import { OrthographicCamera } from './three.js';
import { update, validatePropNumber } from './utils.js';

export default {
  mixins: [VglCamera],
  props: {
    zoom: { type: validatePropNumber, default: 1 },
    near: { type: validatePropNumber, default: 0.1 },
    far: { type: validatePropNumber, default: 2000 },
  },
  computed: {
    inst: () => new OrthographicCamera(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
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
  },
};
