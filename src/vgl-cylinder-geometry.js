import VglGeometry from './vgl-geometry.js';
import { CylinderGeometry } from './three.js';
import { parseFloatEx, parseIntEx, createObjectFromArray } from './utils.js';

const validator = [String, Number];

const props = [
  'radiusTop',
  'radiusBottom',
  'height',
  'radialSegments',
  'heightSegments',
  'openEnded',
  'thetaStart',
  'thetaLength',
];

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, (key, i) => (i === 5 ? Boolean : validator)),
  computed: {
    inst() {
      const opts = props.map((key, i) => (i < 3 || i > 5 ? parseFloatEx : parseIntEx)(this[key]));
      return new CylinderGeometry(...opts);
    },
  },
};
