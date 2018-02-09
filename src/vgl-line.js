import { VglObject3dWithMatarialAndGeometry } from './mixins.js';
import { Line } from './three.js';

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  computed: {
    inst: () => new Line(),
  },
};
