import VglLight from './vgl-light.js';
import { PointLight } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglLight],
  props: {
    distance: { type: number, default: 0 },
    decay: { type: number, default: 1 },
  },
  computed: {
    inst: () => new PointLight(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay),
        });
      },
      immediate: true,
    },
    distance(distance) {
      Object.assign(this.inst, { distance: parseFloat(distance) });
      this.vglObject3d.update();
    },
    decay(decay) {
      Object.assign(this.inst, { decay: parseFloat(decay) });
      this.vglObject3d.update();
    },
  },
};
