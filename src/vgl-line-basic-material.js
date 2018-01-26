import VglMaterial from './vgl-material.js';
import { LineBasicMaterial } from './three.js';
import { string, boolean, number } from './constructor-arrays.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    lights: boolean,
    linewidth: { type: number, default: 1 },
    linecap: { type: string, default: 'round' },
    linejoin: { type: string, default: 'round' },
  },
  computed: {
    inst: () => new LineBasicMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          lights: this.lights,
          linecap: this.linecap,
          linejoin: this.linejoin,
          linewidth: parseFloat(this.linewidth),
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      this.inst.dispatchEvent({ type: 'update' });
    },
    lights(lights) {
      Object.assign(this.inst, { lights });
      this.inst.dispatchEvent({ type: 'update' });
    },
    linewidth(linewidth) {
      Object.assign(this.inst, { linewidth: parseFloat(linewidth) });
      this.inst.dispatchEvent({ type: 'update' });
    },
    linecap(linecap) {
      Object.assign(this.inst, { linecap });
      this.inst.dispatchEvent({ type: 'update' });
    },
    linejoin(linejoin) {
      Object.assign(this.inst, { linejoin });
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
};
