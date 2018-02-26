import VglLight from './vgl-light.js';
import { DirectionalLight } from './three.js';

export default {
  mixins: [VglLight],
  computed: {
    inst: () => new DirectionalLight(),
  },
};
