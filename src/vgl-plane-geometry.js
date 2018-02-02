import VglGeometry from './vgl-geometry.js';
import { PlaneGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const props = [
  'width',
  'height',
  'widthSegments',
  'heightSegments',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst() {
      const opts = props.map((key, i) => (i > 1 ? parseIntEx : parseFloatEx)(this[key]));
      return new PlaneGeometry(...opts);
    },
  },
};
