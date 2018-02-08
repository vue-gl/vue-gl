import { IcosahedronBufferGeometry } from './three.js';
import { VglHedronGeometry } from './mixins.js';

export default {
  mixins: [VglHedronGeometry],
  computed: {
    inst() {
      return new IcosahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    },
  },
};
