import VglGeometry from './vgl-geometry.js';
import { ExtrudeBufferGeometry } from './three.js';

export default {
  mixins: [VglGeometry],
  computed: {
    inst() { return new ExtrudeBufferGeometry([], {}); },
  },
};
