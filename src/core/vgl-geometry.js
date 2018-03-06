import { BufferGeometry } from '../three.js';
import { string } from '../validators.js';

/**
 * This is the base mixin component for all geometry components,
 * corresponding [THREE.Geometry](https://threejs.org/docs/index.html#api/core/Geometry).
 * This can also be used directly for building custom geometries.
 */

export default {
  inject: ['vglNamespace'],
  props: {
    /** Name of the component. */
    name: string,
  },
  computed: {
    inst: () => new BufferGeometry(),
  },
  watch: {
    inst: {
      handler(inst) { this.vglNamespace.geometries[this.name] = inst; },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { geometries }, inst } = this;
      if (geometries[oldName] === inst) delete geometries[oldName];
      geometries[name] = inst;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { geometries }, inst } = this;
    if (geometries[this.name] === inst) delete geometries[this.name];
    inst.dispose();
  },
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
