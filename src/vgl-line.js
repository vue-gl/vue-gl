import VglObject3d from './vgl-object3d.js';
import { Line } from './three.js';
import { VglMaterialListener, VglGeometryListener } from './mixins.js';

export default {
  mixins: [VglObject3d, VglMaterialListener, VglGeometryListener],
  computed: {
    inst: () => new Line(),
  },
};
