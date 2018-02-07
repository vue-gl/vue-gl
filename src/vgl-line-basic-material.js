import VglMaterial from './vgl-material.js';
import { LineBasicMaterial } from './three.js';
import { validatePropString, validatePropNumber, validatePropBoolean } from './utils.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: validatePropString, default: '#fff' },
    lights: validatePropBoolean,
    linewidth: { type: validatePropNumber, default: 1 },
    linecap: { type: validatePropString, default: 'round' },
    linejoin: { type: validatePropString, default: 'round' },
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
