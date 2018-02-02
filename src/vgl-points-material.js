import VglMaterial from './vgl-material.js';
import { PointsMaterial } from './three.js';
import { parseFloatEx } from './utils.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: {
      type: String,
      default: '#fff',
    },
    size: {
      type: [String, Number],
      default: 1,
    },
    disableSizeAttenuation: Boolean,
  },
  computed: {
    inst: () => new PointsMaterial(),
  },
  created() {
    const { inst } = this;
    inst.color.setStyle(this.color);
    inst.size = parseFloatEx(this.size);
    inst.sizeAttenuation = !this.disableSizeAttenuation;
  },
  watch: {
    color(color) {
      this.inst.color.setStyle(color);
    },
    size(size) {
      this.inst.size = parseFloatEx(size);
    },
    disableSizeAttenuation(disabled) {
      this.inst.sizeAttenuation = !disabled;
    },
  },
};
