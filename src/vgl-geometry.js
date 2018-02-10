import { BufferGeometry } from './three.js';
import { validatePropString } from './utils.js';
import { geometries } from './object-stores.js';

export default {
  inject: ['vglGeometries'],
  props: {
    name: validatePropString,
  },
  computed: {
    inst: () => new BufferGeometry(),
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst) delete geometries[oldInst.uuid];
        geometries[inst.uuid] = inst;
        this.$set(this.vglGeometries.forSet, this.name, inst.uuid);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglGeometries.forGet[oldName] === this.inst.uuid) {
        this.$delete(this.vglGeometries.forSet, oldName);
      }
      this.$set(this.vglGeometries.forSet, name, this.inst.uuid);
    },
  },
  beforeDestroy() {
    delete geometries[this.inst.uuid];
    if (this.vglGeometries.forGet[this.name] === this.inst.uuid) {
      this.$delete(this.vglGeometries.forSet, this.name);
    }
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
