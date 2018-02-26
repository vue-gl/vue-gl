import VglObject3d from './vgl-object3d.js';
import { DirectionalLightHelper } from './three.js';
import { string, number } from './validators.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: { type: string },
    size: { type: number, default: 1 },
  },
  computed: {
    inst() { return new DirectionalLightHelper(this.vglObject3d.inst, parseFloat(this.size)); },
  },
  watch: {
    inst: {
      handler(inst) {
        if (this.color) {
          Object.assign(inst, { color: this.color });
          inst.update();
        }
      },
      immediate: true,
    },
    color(color) {
      this.inst.color = color;
      this.inst.update();
    },
  },
};
