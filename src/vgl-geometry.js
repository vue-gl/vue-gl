import { Geometry } from './three.js';
import { string } from './constructor-arrays.js';

export default {
  render(h) {
    const { default: slot } = this.$slots;
    return slot ? h('div', slot) : undefined;
  },
  inject: ['vglNamespace'],
  props: {
    name: string,
  },
  computed: {
    inst: () => new Geometry(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.geometries, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.geometries[oldName] === this.inst) {
        this.$delete(this.vglNamespace.geometries, oldName);
      }
      this.$set(this.vglNamespace.geometries, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglNamespace.geometries[this.name] === this.inst) {
      this.$delete(this.vglNamespace.geometries, this.name);
    }
  },
};
