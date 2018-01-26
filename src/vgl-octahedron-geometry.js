import { OctahedronGeometry } from './three.js';
import { VglHedronGeometry } from './mixins.js';

export default {
  mixins: [VglHedronGeometry],
  computed: {
    inst() {
      return new OctahedronGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    },
  },
};
