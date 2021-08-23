import VglAttribute from './private/vgl-attribute';

/** The 8-bit unsigned integer data store for an attribute. */
export default {
  extends: VglAttribute,
  computed: {
    /** The TypedArray instance. */
    typedArray() { return new Uint8Array(this.arrayLength); },
  },
};
