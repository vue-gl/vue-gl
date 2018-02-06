import VglLight from './vgl-light.js';
import { DirectionalLight } from './three.js';
import { update, validatePropBoolean } from './utils.js';

export default {
  mixins: [VglLight],
  computed: {
    inst: () => new DirectionalLight(),
  },
  props: {
    castShadow: validatePropBoolean,
  },
  watch: {
    castShadow: {
      handler(castShadow) {
        this.inst.castShadow = castShadow;
        update(this);
      },
      immediate: true,
    },
  },
};
