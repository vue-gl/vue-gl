import {
  Material,
  NoColors,
  VertexColors,
  FaceColors,
  FrontSide,
  BackSide,
  DoubleSide,
  ZeroFactor,
  OneFactor,
  SrcColorFactor,
  OneMinusSrcColorFactor,
  SrcAlphaFactor,
  OneMinusSrcAlphaFactor,
  DstAlphaFactor,
  OneMinusDstAlphaFactor,
  DstColorFactor,
  OneMinusDstColorFactor,
  SrcAlphaSaturateFactor,
} from '../three.js';
import { string, number } from '../validators.js';

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

const destinationFactors = {
  zero: ZeroFactor,
  one: OneFactor,
  srcColor: SrcColorFactor,
  oneMinusSrcColor: OneMinusSrcColorFactor,
  srcAlpha: SrcAlphaFactor,
  oneMinusSrcAlpha: OneMinusSrcAlphaFactor,
  dstAlpha: DstAlphaFactor,
  oneMinusDstAlpha: OneMinusDstAlphaFactor,
  dstColor: DstColorFactor,
  oneMinusDstColor: OneMinusDstColorFactor,
};

const sourceFactors = Object.assign({
  srcAlphaSaturate: SrcAlphaSaturateFactor,
}, destinationFactors);

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
    /** The material will not be renderered if the opacity is lower than this value. */
    alphaTest: { type: number, default: 0 },
    /**
     * Blending destination.
     * The blending property must be set to 'custom' for this to have any effect.
     */
    blendDst: { type: string, default: 'oneMinusSrcAlpha' },
    /**
     * Blending source.
     * The blending property must be set to 'custom' for this to have any effect.
     */
    blendSrc: { type: string, default: 'srcAlpha' },
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
          alphaTest: parseFloat(this.alphaTest),
          blendDst: destinationFactors[this.blendDst],
          blendSrc: sourceFactors[this.blendSrc],
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
    alphaTest(alpha) { this.inst.alphaTest = parseFloat(alpha); },
    blendDst(dst) { this.inst.blendDst = destinationFactors[dst]; },
    blendSrc(src) { this.inst.blendSrc = sourceFactors[src]; },
  },
  beforeDestroy() {
    const { vglNamespace: { materials }, inst } = this;
    if (materials[this.name] === inst) delete materials[this.name];
    inst.dispose();
  },
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
