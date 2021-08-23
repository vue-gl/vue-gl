import { Texture } from 'three';
import VglSlotable from '../core/private/vgl-slotable';
import VglSlotHolder from '../core/private/vgl-slot-holder';
import mappings from './constants/mappings';
import wrappings from './constants/wrappings';
import filters from './constants/filters';
import formats from './constants/formats';
import types from './constants/types';
import encodings from './constants/encodings';
import {
  add, anisotropy, centerU, centerV, encoding, format, image, inst, magFilter, mapping, minFilter,
  name, offsetU, offsetV, premultiplyAlpha, remove, repeatU, repeatV, rotation, type, noFlipY,
  unpackAlignment, wrapS, wrapT, change,
} from '../constants';

export default {
  mixins: [VglSlotable, VglSlotHolder],
  props: {
    /** An arbitrary name of the instance. */
    [name]: { type: String, default: '' },
    /**
     * The image mapping mode.
     * @values uv, cubeReflection, cubeRefraction, equirectangularReflection, cubeUVReflection,
     *         equirectangularRefraction, cubeUVRefraction
     */
    [mapping]: { type: String, default: 'uv', validator: (m) => m in mappings },
    /**
     * The horizontal wrapping mode.
     * @values repeat, clampToEdge, mirroredRepeat
     */
    [wrapS]: { type: String, default: 'clampToEdge', validator: (s) => s in wrappings },
    /**
     * The vertical wrapping mode.
     * @values repeat, clampToEdge, mirroredRepeat
     */
    [wrapT]: { type: String, default: 'clampToEdge', validator: (t) => t in wrappings },
    /**
     * The texture magnification method.
     * @values linear, nearest
     */
    [magFilter]: { type: String, default: 'linear', validator: (m) => m in filters },
    /**
     * The texture minification method.
     * @values linear, nearest, nearestMipMapNearest, nearestMipMapLinear, linearMipMapNearest,
     *         linearMipMapLinear
     */
    [minFilter]: { type: String, default: 'linearMipMapLinear', validator: (m) => m in filters },
    [anisotropy]: { type: Number, default: 1, validator: Number.isInteger },
    /** @values alpha, rgb, rgba, luminance, luminanceAlpha, rgbe, depth, depthStencil */
    [format]: { type: String, validator: (f) => f in formats, default: 'rgba' },
    /**
     * @values unsignedByte, byte, short, unsignedShort, int, unsignedInt, float, halfFloat,
     *        unsignedShort4444, unsignedShort5551, unsignedShort565, unsignedInt248
     */
    [type]: { type: String, default: 'unsignedByte', validator: (t) => t in types },
    /** The offset along the U axis. */
    [offsetU]: { type: Number, default: 0 },
    /** The offset along the V axis. */
    [offsetV]: { type: Number, default: 0 },
    /** The repeating times along the U axis. */
    [repeatU]: { type: Number, default: 1 },
    /** The repeating times along the V axis. */
    [repeatV]: { type: Number, default: 1 },
    /** The rotation angle around the center in radians. */
    [rotation]: { type: Number, default: 0 },
    /** The coodinate of the rotating center point on the U axis. */
    [centerU]: { type: Number, default: 0 },
    /** The coodinate of the rotating center point on the V axis. */
    [centerV]: { type: Number, default: 0 },
    /** Wether premultiplying the alpha channel to the colors when uploading to GPU or not. */
    [premultiplyAlpha]: Boolean,
    /** Wether flipping the texture along the vertical axis in GPU or not. */
    [noFlipY]: Boolean,
    /** @values 1, 2, 4, 8 */
    [unpackAlignment]: { type: Number, default: 4, validator: (v) => [1, 2, 4, 8].includes(v) },
    /** @values linear, sRgb, gamma, rgbe, logLuv, rgbm7, rgbm16, rgbde, basicDepth, rgbaDepth */
    [encoding]: { type: String, default: 'linear', validator: (e) => e in encodings },
  },
  computed: {
    /** The THREE.Texture instance. */
    [inst]: () => new Texture(),
  },
  methods: {
    [add](slot, obj) {
      if (slot === image) Object.assign(this[inst], { image: obj, needsUpdate: true });
    },
    [remove](slot, obj) {
      if (slot === image && this[inst].image === obj) {
        Object.assign(this[inst], { image: Texture.DEFAULT_IMAGE, needsUpdate: true });
      }
    },
    [change](slot) {
      if (slot === image) this[inst].needsUpdate = true;
      VglSlotable.methods[change].call(this, slot);
    },
  },
  beforeDestroy() { this[inst].dispose(); },
  watch: {
    [name]: { handler(n) { this[inst].name = n; }, immediate: true },
    [mapping]: { handler(m) { this[inst].mapping = mappings[m]; }, immediate: true },
    [wrapS]: { handler(s) { this[inst].wrapS = wrappings[s]; }, immediate: true },
    [wrapT]: { handler(t) { this[inst].wrapT = wrappings[t]; }, immediate: true },
    [magFilter]: { handler(f) { this[inst].magFilter = filters[f]; }, immediate: true },
    [minFilter]: { handler(f) { this[inst].minFilter = filters[f]; }, immediate: true },
    [anisotropy]: { handler(a) { this[inst].anisotropy = a; }, immediate: true },
    [format]: { handler(f) { this[inst].format = formats[f]; }, immediate: true },
    [type]: { handler(t) { this[inst].type = types[t]; }, immediate: true },
    [offsetU]: { handler(u) { this[inst].offset.setX(u); }, immediate: true },
    [offsetV]: { handler(v) { this[inst].offset.setY(v); }, immediate: true },
    [repeatU]: { handler(u) { this[inst].repeat.setX(u); }, immediate: true },
    [repeatV]: { handler(v) { this[inst].repeat.setY(v); }, immediate: true },
    [rotation]: { handler(r) { this[inst].rotation = r; }, immediate: true },
    [centerU]: { handler(u) { this[inst].center.setX(u); }, immediate: true },
    [centerV]: { handler(v) { this[inst].center.setY(v); }, immediate: true },
    [premultiplyAlpha]: { handler(p) { this[inst].premultiplyAlpha = p; }, immediate: true },
    [noFlipY]: { handler(f) { this[inst].flipY = !f; }, immediate: true },
    [unpackAlignment]: { handler(u) { this[inst].unpackAlignment = u; }, immediate: true },
    [encoding]: { handler(e) { this[inst].encoding = encodings[e]; }, immediate: true },
  },
  /**
   * A `<vgl-image>` component to be used as the texture image.
   * @slot image
   */
  render: undefined,
};
