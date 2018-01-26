import VglLine from './vgl-line.js';
import { LineLoop } from './three.js';

export default {
  mixins: [VglLine],
  computed: {
    inst: () => new LineLoop(),
  },
};
