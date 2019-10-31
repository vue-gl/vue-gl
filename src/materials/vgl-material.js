import {
  Material,
  NoColors,
  VertexColors,
  FaceColors,
  FrontSide,
  BackSide,
  DoubleSide,
} from 'three';
import { string } from '../validators';

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
        this.vglNamespace.materials.set(this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { materials }, inst } = this;
      materials.delete(oldName, inst);
      materials.set(name, inst);
    },
    side(side) { this.inst.side = sides[side]; },
    vertexColors(colors) { this.inst.vertexColors = vertexColors[colors]; },
  },
  beforeDestroy() {
    const { vglNamespace: { materials }, inst } = this;
    materials.delete(this.name, inst);
  },
  beforeUpdate() { this.vglNamespace.materials.emit(this.name, this.inst); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
