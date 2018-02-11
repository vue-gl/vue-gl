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
    inst: {
      handler(inst) {
        Object.assign(inst, { castShadow: this.castShadow });
      },
      immediate: true,
    },
    castShadow(castShadow) {
      this.inst.castShadow = castShadow;
      update(this);
    },
  },
};
