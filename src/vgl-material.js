import { Material } from './three.js';
import { validatePropString } from './utils.js';
import { materials } from './object-stores.js';

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
      handler(inst, oldInst) {
        if (oldInst) delete materials[oldInst.uuid];
        materials[inst.uuid] = inst;
        this.$set(this.vglMaterials.forSet, this.name, inst.uuid);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglMaterials.forGet[oldName] === this.inst.uuid) this.$delete(this.vglMaterials.forSet, oldName);
      this.$set(this.vglMaterials.forSet, name, this.inst.uuid);
    },
  },
  beforeDestroy() {
    if (this.vglMaterials.forGet[this.name] === this.inst.uuid) this.$delete(this.vglMaterials.forSet, this.name);
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};
