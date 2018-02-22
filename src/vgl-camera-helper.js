import VglLineSegments from './vgl-line-segments.js';
import { CameraHelper, Camera } from './three.js';
import { string } from './validators.js';

export default {
  mixins: [VglLineSegments],
  props: {
    camera: string,
  },
  computed: {
    inst() {
      const helper = new CameraHelper(new Camera());
      helper.onBeforeRender = () => {
        helper.camera = this.vglNamespace.cameras[this.camera];
        helper.update();
      };
      return helper;
    },
  },
};
