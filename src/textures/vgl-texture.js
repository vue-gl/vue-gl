import {
  TextureLoader,
  UVMapping,
  CubeReflectionMapping,
  CubeRefractionMapping,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  SphericalReflectionMapping,
  CubeUVReflectionMapping,
  CubeUVRefractionMapping,
  RepeatWrapping,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapNearestFilter,
  LinearMipMapLinearFilter,
  AlphaFormat,
  RGBFormat,
  RGBAFormat,
  LuminanceFormat,
  LuminanceAlphaFormat,
  RGBEFormat,
  DepthFormat,
  DepthStencilFormat,
  UnsignedByteType,
  ByteType,
  ShortType,
  UnsignedShortType,
  IntType,
  UnsignedIntType,
  FloatType,
  HalfFloatType,
  UnsignedShort4444Type,
  UnsignedShort5551Type,
  UnsignedShort565Type,
  UnsignedInt248Type,
  LinearEncoding,
  sRGBEncoding,
  GammaEncoding,
  RGBEEncoding,
  LogLuvEncoding,
  RGBM7Encoding,
  RGBM16Encoding,
  RGBDEncoding,
  BasicDepthPacking,
  RGBADepthPacking,
} from '../three';
import {
  string, number, vector2, boolean,
} from '../validators';
import { parseVector2 } from '../parsers';

const mapping = {
  uv: UVMapping,
  'cube-reflection': CubeReflectionMapping,
  'cube-refraction': CubeRefractionMapping,
  'equirectangular-reflection': EquirectangularReflectionMapping,
  'equirectangular-refraction': EquirectangularRefractionMapping,
  'spherical-reflection': SphericalReflectionMapping,
  'cube-uv-reflection': CubeUVReflectionMapping,
  'cube-uv-refraction': CubeUVRefractionMapping,
};

const wrapping = {
  repeat: RepeatWrapping,
  'clamp-to-edge': ClampToEdgeWrapping,
  'mirrored-repeat': MirroredRepeatWrapping,
};

const filter = {
  nearest: NearestFilter,
  'nearest-mip-map-nearest': NearestMipMapNearestFilter,
  'nearest-mip-map-linear': NearestMipMapLinearFilter,
  linear: LinearFilter,
  'linear-mip-map-nearest': LinearMipMapNearestFilter,
  'linear-mip-map-linear': LinearMipMapLinearFilter,
};

const format = {
  alpha: AlphaFormat,
  rgb: RGBFormat,
  rgba: RGBAFormat,
  luminance: LuminanceFormat,
  'luminance-alpha': LuminanceAlphaFormat,
  rgbe: RGBEFormat,
  depth: DepthFormat,
  'depth-stencil': DepthStencilFormat,
};

const type = {
  'unsigned-byte': UnsignedByteType,
  byte: ByteType,
  short: ShortType,
  'unsigned-short': UnsignedShortType,
  int: IntType,
  'unsigned-int': UnsignedIntType,
  float: FloatType,
  'half-float': HalfFloatType,
  'unsigned-short-4444': UnsignedShort4444Type,
  'unsigned-short-5551': UnsignedShort5551Type,
  'unsigned-short-565': UnsignedShort565Type,
  'unsigned-int-248': UnsignedInt248Type,
};

const encoding = {
  linear: LinearEncoding,
  's-rgb': sRGBEncoding,
  gamma: GammaEncoding,
  rgbe: RGBEEncoding,
  'log-luv': LogLuvEncoding,
  rgbm7: RGBM7Encoding,
  rgbm16: RGBM16Encoding,
  rgbde: RGBDEncoding,
  'basic-depth': BasicDepthPacking,
  'rgba-depth': RGBADepthPacking,
};

/**
 * A texture to apply to a surface or as a reflection or refraction map,
 * corresponding [THREE.Texture](https://threejs.org/docs/index.html#api/textures/Texture).
 */

export default {
  inject: ['vglNamespace'],
  props: {
    /** The path or URL to the file. This can also be a Data URI. */
    src: string,
    name: string,
    mapping: { type: string, default: 'uv' },
    wrapS: { type: string, default: 'clamp-to-edge' },
    wrapT: { type: string, default: 'clamp-to-edge' },
    magFilter: { type: string, default: 'linear' },
    minFilter: { type: string, default: 'linear-mip-map-linear' },
    anisotropy: { type: number, default: 1 },
    format: string,
    type: { type: string, default: 'unsigned-byte' },
    offset: vector2,
    repeat: vector2,
    rotation: { type: number, default: 0 },
    center: vector2,
    premultiplyAlpha: boolean,
    unpackAlignment: { type: number, default: 4 },
    encoding: { type: string, default: 'linear' },
  },
  computed: {
    inst() {
      return new TextureLoader().load(this.src, (texture) => {
        if (this.format) Object.assign(texture, { format: format[this.format] });
        this.vglNamespace.update();
      });
    },
  },
  watch: {
    inst: {
      handler(inst) {
        this.vglNamespace.textures[this.name] = inst;
        Object.assign(inst, {
          mapping: mapping[this.mapping],
          wrapS: wrapping[this.wrapS],
          wrapT: wrapping[this.wrapT],
          magFilter: filter[this.magFilter],
          minFilter: filter[this.minFilter],
          anisotropy: parseInt(this.anisotropy, 10),
          type: type[this.type],
          rotation: parseFloat(this.rotation),
          premultiplyAlpha: this.premultiplyAlpha,
          unpackAlignment: parseInt(this.unpackAlignment, 10),
          encoding: encoding[this.encoding],
        });
        if (this.offset) inst.offset.copy(parseVector2(this.offset));
        if (this.repeat) inst.repeat.copy(parseVector2(this.repeat));
        if (this.center) inst.center.copy(parseVector2(this.center));
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { textures }, inst } = this;
      if (textures[oldName] === inst) delete textures[oldName];
      textures[name] = inst;
    },
    mapping(mode) { this.inst.mapping = mapping[mode]; },
    wrapS(mode) { this.inst.wrapS = wrapping[mode]; },
    wrapT(mode) { this.inst.wrapT = wrapping[mode]; },
    magFilter(mode) { this.inst.magFilter = filter[mode]; },
    minFilter(mode) { this.inst.minFilter = filter[mode]; },
    anisotropy(anisotropy) { this.inst.anisotropy = parseInt(anisotropy, 10); },
    format(mode) { this.inst.format = format[mode]; },
    type(mode) { this.inst.type = type[mode]; },
    offset(offset) { this.inst.offset.copy(parseVector2(offset)); },
    repeat(repeat) { this.inst.repeat.copy(parseVector2(repeat)); },
    rotation(rotation) { this.inst.rotation = parseFloat(rotation); },
    center(center) { this.inst.center.copy(parseVector2(center)); },
    premultiplyAlpha(premultiplyAlpha) { this.inst.premultiplyAlpha = premultiplyAlpha; },
    unpackAlignment(unpackAlignment) { this.inst.unpackAlignment = parseInt(unpackAlignment, 10); },
    encoding(mode) { this.inst.encoding = encoding[mode]; },
  },
  beforeDestroy() {
    const { vglNamespace: { textures }, inst, name } = this;
    if (textures[name] === inst) delete textures[name];
  },
  beforeUpdate() {
    this.inst.needsUpdate = true;
    this.vglNamespace.update();
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
