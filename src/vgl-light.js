import VglObject3d from './vgl-object3d.js';
import { Light } from './three.js';
import { string, number } from './validators.js';

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
        inst.color.setStyle(this.color);
        Object.assign(inst, { intensity: parseFloat(this.intensity) });
      },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      this.vglUpdate && this.vglUpdate();
    },
    intensity(intensity) {
      this.inst.intensity = parseFloat(intensity);
      this.vglUpdate && this.vglUpdate();
    },
  },
};
