import VglObject3d from './vgl-object3d.js';
import { CameraHelper, Camera } from './three.js';
import { string } from './validators.js';

export default {
  mixins: [VglObject3d],
  props: {
    camera: string,
  },
  computed: {
    inst: () => new CameraHelper(new Camera()),
  },
  methods: {
    setCamera() {
      this.inst.camera = this.vglNamespace.cameras[this.camera];
      this.inst.camera.updateProjectionMatrix();
      this.inst.update();
    },
  },
  created() { this.vglNamespace.beforeRender.push(this.setCamera); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setCamera } = this;
    beforeRender.splice(beforeRender.indexOf(setCamera), 1);
  },
};
