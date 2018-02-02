import VglGeometry from './vgl-geometry.js';
import { BoxGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const propsFloat = [
  'width',
  'height',
  'depth',
];
const propsInt = [
  'widthSegments',
  'heightSegments',
  'depthSegments',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(
    propsFloat,
    () => validator,
    createObjectFromArray(
      propsInt,
      () => validator,
    ),
  ),
  computed: {
    inst() {
      return new BoxGeometry(
        ...propsFloat.map(key => parseFloatEx(this[key])),
        ...propsInt.map(key => parseIntEx(this[key])),
      );
    },
  },
};
