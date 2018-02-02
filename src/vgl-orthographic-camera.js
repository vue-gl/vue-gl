import VglCamera from './vgl-camera.js';
import { OrthographicCamera } from './three.js';
import { parseFloatEx, update, validatePropNumber } from './utils.js';

export default {
  mixins: [VglCamera],
  props: {
    zoom: {
      type: validatePropNumber,
      default: 1,
    },
    near: {
      type: validatePropNumber,
      default: 0.1,
    },
    far: {
      type: validatePropNumber,
      default: 2000,
    },
  },
  computed: {
    inst: () => new OrthographicCamera(),
  },
  watch: {
    zoom: {
      handler(zoom) {
        this.inst.zoom = parseFloatEx(zoom);
        update(this);
      },
      immediate: true,
    },
    near: {
      handler(near) {
        this.inst.near = parseFloatEx(near);
        update(this);
      },
      immediate: true,
    },
    far: {
      handler(far) {
        this.inst.far = parseFloatEx(far);
        update(this);
      },
      immediate: true,
    },
  },
};
