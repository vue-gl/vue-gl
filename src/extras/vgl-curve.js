import { Curve } from 'three';
import { name } from '../types';
import { validateName } from '../validators';

/**
 * An abstract base component for representing a curve, corresponding
 * [THREE.Curve](https://threejs.org/docs/index.html#api/extras/core/Curve).
 */
export default {
  inject: {
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  props: {
    /** Name of the component. */
    name: { type: name, required: true, validator: validateName },
  },
  computed: {
    /** The THREE.Curve instance. */
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
    name(newName, oldName) {
      if (oldName !== undefined) this.vglNamespace.curves.delete(oldName, this.inst);
      if (newName !== undefined) this.vglNamespace.curves.set(newName, this.inst);
    },
  },
  render(h) {
    if (!this.$slots.default) return undefined;
    return h('div', { style: { display: 'none' } }, this.$slots.default);
  },
};
