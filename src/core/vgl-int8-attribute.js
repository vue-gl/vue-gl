import VglAttribute from './private/vgl-attribute';

/** The 8-bit integer data store for an attribute. */
export default {
  extends: VglAttribute,
  computed: {
    /** The TypedArray instance. */
    typedArray() { return new Int8Array(this.arrayLength); },
  },
};
