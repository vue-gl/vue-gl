import {
  TextureLoader, UVMapping, CubeReflectionMapping, CubeRefractionMapping,
  EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping,
  CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping,
  MirroredRepeatWrapping, NearestFilter, LinearFilter, NearestMipMapNearestFilter,
  NearestMipMapLinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, AlphaFormat,
  RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat,
  DepthStencilFormat, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType,
  UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type,
  UnsignedShort565Type, UnsignedInt248Type, LinearEncoding, sRGBEncoding, GammaEncoding,
  RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking,
  RGBADepthPacking,
} from 'three';
import {
  string, vector2, boolean, name, int, float,
} from '../types';
import { parseVector2 } from '../parsers';
import { validateName, validateVector2 } from '../validators';

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
  inject: {
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  props: {
    /** The path or URL to the file. This can also be a Data URI. */
    src: string,
    name: { type: name, required: true, validator: validateName },
    mapping: { type: string, default: 'uv' },
    wrapS: { type: string, default: 'clamp-to-edge' },
    wrapT: { type: string, default: 'clamp-to-edge' },
    magFilter: { type: string, default: 'linear' },
    minFilter: { type: string, default: 'linear-mip-map-linear' },
    anisotropy: { type: int, default: 1 },
    format: string,
    type: { type: string, default: 'unsigned-byte' },
    offset: { type: vector2, validator: validateVector2 },
    repeat: { type: vector2, validator: validateVector2 },
    rotation: { type: float, default: 0 },
    center: { type: vector2, validator: validateVector2 },
    premultiplyAlpha: boolean,
    unpackAlignment: { type: int, default: 4 },
    encoding: { type: string, default: 'linear' },
  },
  computed: {
    /** The THREE.Texture instance. */
    inst() {
      return new TextureLoader().load(this.src, (texture) => {
        if (this.format) Object.assign(texture, { format: format[this.format] });
        this.update();
      });
    },
  },
  methods: {
    /** Emit an event in the `textures` namespace. */
    update() {
      if (this.name !== undefined) this.vglNamespace.textures.emit(this.name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.name !== undefined) this.vglNamespace.textures.delete(this.name, this.inst);
  },
  watch: {
    inst: {
      handler(inst) {
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
        if (this.name !== undefined) this.vglNamespace.textures.set(this.name, inst);
      },
      immediate: true,
    },
    name(newName, oldName) {
      if (oldName !== undefined) this.vglNamespace.textures.delete(oldName, this.inst);
      if (newName !== undefined) this.vglNamespace.textures.set(newName, this.inst);
    },
    mapping(mode) {
      this.inst.mapping = mapping[mode];
      this.update();
    },
    wrapS(mode) {
      this.inst.wrapS = wrapping[mode];
      this.update();
    },
    wrapT(mode) {
      this.inst.wrapT = wrapping[mode];
      this.update();
    },
    magFilter(mode) {
      this.inst.magFilter = filter[mode];
      this.update();
    },
    minFilter(mode) {
      this.inst.minFilter = filter[mode];
      this.update();
    },
    anisotropy(anisotropy) {
      this.inst.anisotropy = parseInt(anisotropy, 10);
      this.update();
    },
    format(mode) {
      this.inst.format = format[mode];
      this.update();
    },
    type(mode) {
      this.inst.type = type[mode];
      this.update();
    },
    offset(offset) {
      this.inst.offset.copy(parseVector2(offset));
      this.update();
    },
    repeat(repeat) {
      this.inst.repeat.copy(parseVector2(repeat));
      this.update();
    },
    rotation(rotation) {
      this.inst.rotation = parseFloat(rotation);
      this.update();
    },
    center(center) {
      this.inst.center.copy(parseVector2(center));
      this.update();
    },
    premultiplyAlpha(premultiplyAlpha) {
      this.inst.premultiplyAlpha = premultiplyAlpha;
      this.update();
    },
    unpackAlignment(unpackAlignment) {
      this.inst.unpackAlignment = parseInt(unpackAlignment, 10);
      this.update();
    },
    encoding(mode) {
      this.inst.encoding = encoding[mode];
      this.update();
    },
  },
  render(h) {
    if (!this.$slots.default) return undefined;
    return h('div', { style: { display: 'none' } }, this.$slots.default);
  },
};
