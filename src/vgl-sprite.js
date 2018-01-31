import VglObject3d from './vgl-object3d.js';
import { Sprite } from './three.js';
import { VglMaterialListener } from './mixins.js';

export default {
  mixins: [VglObject3d, VglMaterialListener],
  computed: {
    inst: () => new Sprite(),
  },
};
