import VglObject3d from './vgl-object3d.js';
import { DirectionalLightHelper, Object3D } from './three.js';
import { validatePropString, validatePropNumber, findParent } from './utils.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: { type: validatePropString },
    size: { type: validatePropNumber, default: 1 },
  },
  computed: {
    inst() { return this.i; },
    hex() { return 'color' in this.i && this.i.parent && this.i.parent.color.getHex(); },
  },
  created() {
    const p = findParent(this, 'isVglObject3d');
    if (p) this.i = new DirectionalLightHelper(p.inst, parseFloat(this.size), this.color);
  },
  data() {
    return {
      i: new Object3D(),
    };
  },
  watch: {
    color(color) {
      if ('color' in this.i) {
        this.inst.color = color;
        this.inst.update();
      }
    },
    hex(hex) {
      if (hex && !this.color) this.inst.update();
    },
    size(size) {
      if (this.i.parent) {
        this.i = new DirectionalLightHelper(this.i.parent, parseFloat(size), this.color);
      }
    },
  },
};
