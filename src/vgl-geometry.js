import { Geometry } from './three.js';
import { validatePropString } from './utils.js';

export default {
  inject: ['vglGeometries'],
  props: {
    name: validatePropString,
  },
  computed: {
    inst: () => new Geometry(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglGeometries.forSet, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglGeometries.forGet[oldName] === this.inst) this.$delete(this.vglGeometries.forSet, oldName);
      this.$set(this.vglGeometries.forSet, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglGeometries.forGet[this.name] === this.inst) this.$delete(this.vglGeometries.forSet, this.name);
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};
