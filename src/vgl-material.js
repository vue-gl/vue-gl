import { Material } from './three.js';
import { string } from './validators.js';

export default {
  inject: ['vglNamespace'],
  props: {
    name: string,
  },
  computed: {
    inst: () => new Material(),
  },
  watch: {
    inst: {
      handler(inst) { this.vglNamespace.materials[this.name] = inst; },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { materials }, inst } = this;
      if (materials[oldName] === inst) delete materials[oldName];
      materials[name] = inst;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { materials }, inst } = this;
    if (materials[this.name] === inst) delete materials[this.name];
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
