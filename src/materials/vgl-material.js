import {
  Material,
  NoColors,
  VertexColors,
  FaceColors,
} from '../three.js';
import { string } from '../validators.js';

const vertexColors = {
  no: NoColors,
  vertex: VertexColors,
  face: FaceColors,
};

/**
 * Abstract mixin component for materials,
 * corresponding [THREE.Material](https://threejs.org/docs/index.html#api/materials/Material).
 */

export default {
  inject: ['vglNamespace'],
  props: {
    /** Name of the material. */
    name: string,
    /** Defines whether vertex coloring is used. Other options are 'vertex' and 'face'. */
    vertexColors: { type: string, default: 'no' },
  },
  computed: {
    inst: () => new Material(),
  },
  watch: {
    inst: {
      handler(inst) {
        inst.setValues({
          vertexColors: vertexColors[this.vertexColors],
        });
        this.vglNamespace.materials[this.name] = inst;
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { materials }, inst } = this;
      if (materials[oldName] === inst) delete materials[oldName];
      materials[name] = inst;
    },
    vertexColors(colors) { this.inst.vertexColors = vertexColors[colors]; },
  },
  beforeDestroy() {
    const { vglNamespace: { materials }, inst } = this;
    if (materials[this.name] === inst) delete materials[this.name];
  },
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
