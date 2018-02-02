import VglGeometry from './vgl-geometry.js';
import { TorusGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const props = [
  'radius',
  'tube',
  'radialSegments',
  'tubularSegments',
  'arc',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst() {
      const opts = props.map((key, i) => (i < 2 || i > 3 ? parseFloatEx : parseIntEx)(this[key]));
      return new TorusGeometry(...opts);
    },
  },
};
