import VglMaterial from './vgl-material.js';
import { LineBasicMaterial } from './three.js';
import { validatePropString, validatePropNumber, validatePropBoolean } from './utils.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: String, default: '#fff' },
    lights: validatePropBoolean,
    linewidth: { type: validatePropNumber, default: 1 },
    linecap: { type: validatePropString, default: 'round' },
    linejoin: { type: validatePropString, default: 'round' },
  },
  computed: {
    inst: () => new LineBasicMaterial(),
  },
  created() {
    const { inst } = this;
    inst.lights = this.lights;
    inst.linecap = this.linecap;
    inst.linejoin = this.linejoin;
    inst.linewidth = parseFloat(this.linewidth);
    inst.color.setStyle(this.color);
  },
  watch: {
    color(color) {
      this.inst.color.setStyle(color);
    },
    lights(lights) {
      this.inst.lights = lights;
    },
    linewidth(width) {
      this.inst.linewidth = parseFloat(width);
    },
    linecap(cap) {
      this.inst.linecap = cap;
    },
    linejoin(join) {
      this.inst.linejoin = join;
    },
  },
};
