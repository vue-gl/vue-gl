import VglObject3d from './vgl-object3d.js';
import { Light } from './three.js';
import { string, number } from './constructor-arrays.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: { type: string, default: '#fff' },
    intensity: { type: number, default: 1 },
  },
  computed: {
    inst: () => new Light(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          intensity: parseFloat(this.intensity),
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      this.vglObject3d.update();
    },
    intensity(intensity) {
      Object.assign(this.inst, { intensity: parseFloat(intensity) });
      this.vglObject3d.update();
    },
  },
};
