import VglLineSegments from './vgl-line-segments.js';
import { BoxHelper } from './three.js';
import { string } from './validators.js';

export default {
  mixins: [VglLineSegments],
  props: {
    color: { type: string, default: '#ff0' },
  },
  computed: {
    inst: () => new BoxHelper(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$nextTick(() => { inst.setFromObject(this.vglObject3d.inst); });
        inst.material.color.setStyle(this.color);
      },
      immediate: true,
    },
    'vglObject3d.inst': function watcher(parent) {
      this.inst.setFromObject(parent);
    },
    color(color) {
      this.inst.material.color.setStyle(color);
    },
  },
};
