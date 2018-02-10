import { Material } from './three.js';
import { validatePropString } from './utils.js';

export default {
  inject: ['vglMaterials'],
  props: {
    name: validatePropString,
  },
  computed: {
    inst: () => new Material(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglMaterials.forSet, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglMaterials.forGet[oldName] === this.inst) this.$delete(this.vglMaterials.forSet, oldName);
      this.$set(this.vglMaterials.forSet, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglMaterials.forGet[this.name] === this.inst) this.$delete(this.vglMaterials.forSet, this.name);
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};
