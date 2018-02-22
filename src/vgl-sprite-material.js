import { VglMaterialWithMap } from './mixins.js';
import { SpriteMaterial } from './three.js';
import { string } from './validators.js';

export default {
  mixins: [VglMaterialWithMap],
  props: {
    color: { type: string, default: '#fff' },
  },
  computed: {
    inst: () => new SpriteMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { inst.color.setStyle(this.color); },
      immediate: true,
    },
    color(color) { this.inst.color.setStyle(color); },
  },
};
