import {
  Material, NoColors, VertexColors, FaceColors, FrontSide, BackSide, DoubleSide,
} from 'three';
import { string, name } from '../types';
import { validateName } from '../validators';

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
  inject: {
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  props: {
    /** Name of the material. */
    name: { type: name, required: true, validator: validateName },
    /** Defines which side of faces will be rendered. front, back or double. */
    side: { type: string, default: 'front' },
    /** Defines whether vertex coloring is used. Other options are 'vertex' and 'face'. */
    vertexColors: { type: string, default: 'no' },
  },
  computed: {
    /** The THREE.Material instance. */
    inst: () => new Material(),
  },
  methods: {
    /**
     * Emit an event in `materials` namespace. Call this method after editing instance's
     * properties.
     */
    update() {
      if (this.name !== undefined) this.vglNamespace.materials.emit(this.name, this.inst);
    },
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
    name(newName, oldName) {
      if (oldName !== undefined) this.vglNamespace.materials.delete(oldName, this.inst);
      if (newName !== undefined) this.vglNamespace.materials.set(newName, this.inst);
    },
    side(side) {
      this.inst.side = sides[side];
      this.update();
    },
    vertexColors(colors) {
      this.inst.vertexColors = vertexColors[colors];
      this.update();
    },
  },
  beforeDestroy() {
    if (this.name !== undefined) this.vglNamespace.materials.delete(this.name, this.inst);
  },
  render(h) {
    if (!this.$slots.default) return undefined;
    return h('div', { style: { display: 'none' } }, this.$slots.default);
  },
};
