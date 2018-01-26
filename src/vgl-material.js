import { Material } from './three.js';
import { string } from './constructor-arrays.js';
import { VglMinimumRenderer } from './mixins.js';

export default {
  mixins: [VglMinimumRenderer],
  inject: ['vglNamespace'],
  props: {
    name: string,
  },
  computed: {
    inst: () => new Material(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.materials, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.materials[oldName] === this.inst) {
        this.$delete(this.vglNamespace.materials, oldName);
      }
      this.$set(this.vglNamespace.materials, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglNamespace.materials[this.name] === this.inst) {
      this.$delete(this.vglNamespace.materials, this.name);
    }
  },
};
