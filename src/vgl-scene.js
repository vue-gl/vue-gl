import VglObject3d from './vgl-object3d.js';
import { Scene } from './three.js';

export default {
  mixins: [VglObject3d],
  computed: {
    inst: () => new Scene(),
  },
  watch: {
    inst: {
      handler(inst) { this.vglNamespace.scenes[this.name] = inst; },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.scenes[oldName] === this.inst) delete this.vglNamespace.scenes[oldName];
      this.vglNamespace.scenes[name] = this.inst;
    },
  },
  beforeDestroy() {
    if (this.vglNamespace.scenes[this.name] === this.inst) {
      delete this.vglNamespace.scenes[this.name];
    }
  },
};
