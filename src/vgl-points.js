import { VglObject3dWithMatarialAndGeometry } from './mixins.js';
import { Points } from './three.js';

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  computed: {
    inst: () => new Points(),
  },
};
