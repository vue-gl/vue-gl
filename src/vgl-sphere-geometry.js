import VglGeometry from './vgl-geometry.js';
import { SphereGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const props = [
  'radius',
  'widthSegments',
  'heightSegments',
  'phiStart',
  'phiLength',
  'thetaStart',
  'thetaLength',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst() {
      const opts = props.map((key, i) => (i < 1 || i > 2 ? parseFloatEx : parseIntEx)(this[key]));
      return new SphereGeometry(...opts);
    },
  },
};
