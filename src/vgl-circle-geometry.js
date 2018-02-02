import VglGeometry from './vgl-geometry.js';
import { CircleGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const props = [
  'radius',
  'segments',
  'thetaStart',
  'thetaLength',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst() {
      const opts = props.map((key, i) => (i === 1 ? parseIntEx : parseFloatEx)(this[key]));
      return new CircleGeometry(...opts);
    },
  },
};
