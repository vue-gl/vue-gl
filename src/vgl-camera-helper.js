import VglLineSegments from './vgl-line-segments.js';
import { CameraHelper, LineSegments } from './three.js';
import { string } from './validators.js';
import { cameras } from './object-stores.js';

export default {
  mixins: [VglLineSegments],
  props: {
    camera: string,
  },
  inject: ['vglCameras'],
  computed: {
    inst() {
      const cmr = cameras[this.vglCameras.forGet[this.camera]];
      return cmr ? new CameraHelper(cmr) : new LineSegments();
    },
  },
};
