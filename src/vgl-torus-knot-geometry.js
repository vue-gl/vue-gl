import VglGeometry from './vgl-geometry.js';
import { TorusKnotGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const props = [
  'radius',
  'tube',
  'tubularSegments',
  'radialSegments',
  'p',
  'q',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst() {
      const opts = props.map((key, i) => (i < 2 || i > 3 ? parseFloatEx : parseIntEx)(this[key]));
      return new TorusKnotGeometry(...opts);
    },
  },
};
