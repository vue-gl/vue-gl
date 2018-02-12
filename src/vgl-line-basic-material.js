import VglMaterial from './vgl-material.js';
import { LineBasicMaterial } from './three.js';
import { string, number, boolean } from './validators.js';

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
    color(color) { this.inst.color.setStyle(color); },
    lights(lights) { this.inst.lights = lights; },
    linewidth(width) { this.inst.linewidth = parseFloat(width); },
    linecap(cap) { this.inst.linecap = cap; },
    linejoin(join) { this.inst.linejoin = join; },
  },
};
