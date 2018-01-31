import VglMaterial from './vgl-material.js';
import { MeshStandardMaterial } from './three.js';
import { string } from './constructor-arrays.js';
import { VglMapListener } from './mixins.js';

export default {
  mixins: [VglMaterial, VglMapListener],
  props: {
    color: { type: string, default: '#fff' },
  },
  computed: {
    inst: () => new MeshStandardMaterial(),
  },
  watch: {
    inst: {
      handler(inst) {
        inst.color.setStyle(this.color);
      },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
};
