import VglLineSegments from './vgl-line-segments.js';
import { CameraHelper } from './three.js';
import { string } from './constructor-arrays.js';

export default {
  mixins: [VglLineSegments],
  props: {
    camera: string,
  },
  inject: ['vglNamespace'],
  computed: {
    inst() {
      return new CameraHelper(this.vglNamespace.cameras[this.camera]);
    },
  },
};
