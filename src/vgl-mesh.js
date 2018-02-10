import { VglObject3dWithMatarialAndGeometry } from './mixins.js';
import { Mesh } from './three.js';

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  computed: {
    inst: () => new Mesh(),
  },
};
