import { Curve } from 'three';
import { string } from '../validators';

export default {
  inject: {
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  props: {
    name: string,
  },
  computed: {
    inst: () => new Curve(),
  },
  beforeDestroy() {
    if (this.name !== undefined) this.vglNamespace.curves.delete(this.name, this.inst);
  },
  watch: {
    inst: {
      handler(inst) { if (this.name !== undefined) this.vglNamespace.curves.set(this.name, inst); },
      immediate: true,
    },
    name(name, oldName) {
      if (oldName !== undefined) this.vglNamespace.curves.delete(oldName, this.inst);
      if (name !== undefined) this.vglNamespace.curves.set(name, this.inst);
    },
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
