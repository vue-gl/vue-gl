import VglObject3d from './vgl-object3d.js';
import { VglMaterialListener, VglGeometryListener } from './mixins.js';
import { Mesh } from './three.js';

export default {
  mixins: [VglObject3d, VglMaterialListener, VglGeometryListener],
  computed: {
    inst: () => new Mesh(),
  },
};
