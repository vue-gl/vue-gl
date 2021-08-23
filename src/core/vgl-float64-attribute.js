import VglAttribute from './private/vgl-attribute';

/** The 64-bit float data store for an attribute. */
export default {
  extends: VglAttribute,
  computed: {
    /** The TypedArray instance. */
    typedArray() { return new Float64Array(this.arrayLength); },
  },
};
