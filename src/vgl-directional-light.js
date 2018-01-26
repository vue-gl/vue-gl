import VglLight from './vgl-light.js';
import { DirectionalLight } from './three.js';
import { boolean } from './constructor-arrays.js';

export default {
  mixins: [VglLight],
  computed: {
    inst: () => new DirectionalLight(),
  },
  props: {
    castShadow: boolean,
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          castShadow: this.castShadow,
        });
      },
      immediate: true,
    },
    castShadow(castShadow) {
      Object.assign(this.inst, { castShadow });
      this.vglObject3d.update();
    },
  },
};
