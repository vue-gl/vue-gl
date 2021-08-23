import VglAttribute from './private/vgl-attribute';

/** The 32-bit unsigned integer data store for an attribute. */
export default {
  extends: VglAttribute,
  computed: {
    /** The TypedArray instance. */
    typedArray() { return new Uint32Array(this.arrayLength); },
  },
};
