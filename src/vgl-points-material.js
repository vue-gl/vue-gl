import VglMaterial from './vgl-material.js';
import { PointsMaterial } from './three.js';
import { string, number, boolean } from './validators.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    size: { type: number, default: 1 },
    disableSizeAttenuation: boolean,
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
      this.inst.dispatchEvent({ type: 'update' });
    },
    size(size) {
      this.inst.size = parseFloat(size);
      this.inst.dispatchEvent({ type: 'update' });
    },
    disableSizeAttenuation(disabled) {
      this.inst.sizeAttenuation = !disabled;
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
};
