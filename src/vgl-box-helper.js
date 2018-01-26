import VglLineSegments from './vgl-line-segments.js';
import { BoxHelper } from './three.js';
import { string } from './constructor-arrays.js';

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
        inst.setFromObject(this.vglObject3d.inst);
        inst.material.color.setStyle(this.color);
      },
      immediate: true,
    },
    'vglObject3d.inst': function parentInst(inst) {
      this.inst.setFromObject(inst);
      this.vglObject3d.update();
    },
    color(color) {
      this.inst.material.color.setStyle(color);
      this.vglObject3d.update();
    },
  },
};
