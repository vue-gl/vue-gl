import { VglMinimumRenderer } from './mixins.js';
import { Curve } from './three.js';
import { string } from './constructor-arrays.js';

export default {
  mixins: [VglMinimumRenderer],
  inject: ['vglNamespace'],
  props: {
    name: string,
  },
  computed: {
    inst: () => new Curve(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.curves, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.curves[oldName] === this.inst) {
        this.$delete(this.vglNamespace.curves, oldName);
      }
      this.$set(this.vglNamespace.curves, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglNamespace.curves[this.name] === this.inst) {
      this.$delete(this.vglNamespace.curves, this.name);
    }
  },
};
