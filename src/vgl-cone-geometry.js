import VglCylinderGeometry from './vgl-cylinder-geometry.js';
import { ConeGeometry } from './three.js';
import { parseFloatEx, parseIntEx } from './utils.js';

export default {
  mixins: [VglCylinderGeometry],
  props: {
    radius: [String, Number],
  },
  computed: {
    inst() {
      return new ConeGeometry(...[
        'radius',
        'height',
        'radialSegments',
        'heightSegments',
        'openEnded',
        'thetaStart',
        'thetaLength',
      ].map((key, i) => (i < 2 || i > 4 ? parseFloatEx : parseIntEx)(this[key])));
    },
  },
};
