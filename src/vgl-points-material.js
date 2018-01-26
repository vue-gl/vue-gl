import VglMaterial from './vgl-material.js';
import { PointsMaterial } from './three.js';
import { string, number, boolean } from './constructor-arrays.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    size: { type: number, default: 1 },
    disableSizeAttenuation: boolean,
    lights: boolean,
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
          lights: this.lights,
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
      Object.assign(this.inst, { size: parseFloat(size) });
      this.inst.dispatchEvent({ type: 'update' });
    },
    disableSizeAttenuation(disabledSizeAttenuation) {
      Object.assign(this.inst, { sizeAttenuation: !disabledSizeAttenuation });
      this.inst.dispatchEvent({ type: 'update' });
    },
    lights(lights) {
      Object.assign(this.inst, { lights });
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
};
