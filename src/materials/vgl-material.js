import { Material } from '../three.js';
import { string } from '../validators.js';

/**
 * Abstract mixin component for materials,
 * corresponding [THREE.Material](https://threejs.org/docs/index.html#api/materials/Material).
 */

export default {
  inject: ['vglNamespace'],
  props: {
    /** Name of the material. */
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
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
