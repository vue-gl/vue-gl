import { VglHedronGeometry } from './mixins.js';
import { TetrahedronGeometry } from './three.js';

export default {
  mixins: [VglHedronGeometry],
  computed: {
    inst() {
      return new TetrahedronGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    },
  },
};
