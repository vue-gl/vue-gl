import VglLine from './vgl-line.js';
import { LineSegments } from './three.js';

export default {
  mixins: [VglLine],
  computed: {
    inst: () => new LineSegments(),
  },
};
