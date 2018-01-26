import VglObject3d from './vgl-object3d.js';
import { Group } from './three.js';

export default {
  mixins: [VglObject3d],
  computed: {
    inst: () => new Group(),
  },
};
