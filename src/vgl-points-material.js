import VglMaterial from './vgl-material.js';
import { PointsMaterial } from './three.js';
import { validatePropString, validatePropNumber, validatePropBoolean } from './utils.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: validatePropString, default: '#fff' },
    size: { type: validatePropNumber, default: 1 },
    disableSizeAttenuation: validatePropBoolean,
  },
  computed: {
    inst: () => new PointsMaterial(),
  },
  created() {
    const { inst } = this;
    inst.color.setStyle(this.color);
    inst.size = parseFloat(this.size);
    inst.sizeAttenuation = !this.disableSizeAttenuation;
  },
  watch: {
    color(color) {
      this.inst.color.setStyle(color);
    },
    size(size) {
      this.inst.size = parseFloat(size);
    },
    disableSizeAttenuation(disabled) {
      this.inst.sizeAttenuation = !disabled;
    },
  },
};
