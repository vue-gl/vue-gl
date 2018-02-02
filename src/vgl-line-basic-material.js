import VglMaterial from './vgl-material.js';
import { LineBasicMaterial } from './three.js';
import { parseFloatEx } from './utils.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: {
      type: String,
      default: '#fff',
    },
    lights: Boolean,
    linewidth: {
      type: [String, Number],
      default: 1,
    },
    linecap: {
      type: String,
      default: 'round',
    },
    linejoin: {
      type: String,
      default: 'round',
    },
  },
  computed: {
    inst: () => new LineBasicMaterial(),
  },
  created() {
    const { inst } = this;
    inst.lights = this.lights;
    inst.linecap = this.linecap;
    inst.linejoin = this.linejoin;
    inst.linewidth = parseFloatEx(this.linewidth);
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
      this.inst.linewidth = parseFloatEx(width);
    },
    linecap(cap) {
      this.inst.linecap = cap;
    },
    linejoin(join) {
      this.inst.linejoin = join;
    },
  },
};
