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
  },
};
