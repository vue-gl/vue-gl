import {
  Material,
  NoColors,
  VertexColors,
  FaceColors,
  FrontSide,
  BackSide,
  DoubleSide,
} from '../three.js';
import { string } from '../validators.js';

const vertexColors = {
  no: NoColors,
  vertex: VertexColors,
  face: FaceColors,
};

const sides = {
  front: FrontSide,
  back: BackSide,
  double: DoubleSide,
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
    /** Defines which side of faces will be rendered. front, back or double. */
    side: { type: string, default: 'front' },
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
          side: sides[this.side],
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
    side(side) { this.inst.side = sides[side]; },
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
