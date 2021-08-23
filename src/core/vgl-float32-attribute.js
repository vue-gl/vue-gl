import VglAttribute from './private/vgl-attribute';

/** The 32-bit float data store for an attribute. */
export default {
  extends: VglAttribute,
  computed: {
    /** The TypedArray instance. */
    typedArray() { return new Float32Array(this.arrayLength); },
  },
};
