import { VglObject3dWithMatarial } from './mixins.js';
import { Sprite } from './three.js';

export default {
  mixins: [VglObject3dWithMatarial],
  computed: {
    inst: () => new Sprite(),
  },
};
