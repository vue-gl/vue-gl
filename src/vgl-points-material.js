import VglMaterial from './vgl-material.js';
import { PointsMaterial } from './three.js';
import { validatePropString, validatePropNumber, validatePropBoolean, dispatchUpdate } from './utils.js';

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
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          size: parseFloat(this.size),
          sizeAttenuation: !this.disableSizeAttenuation,
        });
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      dispatchUpdate(this);
    },
    size(size) {
      this.inst.size = parseFloat(size);
      dispatchUpdate(this);
    },
    disableSizeAttenuation(disabled) {
      this.inst.sizeAttenuation = !disabled;
      dispatchUpdate(this);
    },
  },
};
