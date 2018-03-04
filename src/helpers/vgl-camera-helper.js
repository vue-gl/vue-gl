import VglObject3d from '../core/vgl-object3d.js';
import { CameraHelper, Camera } from '../three.js';
import { string } from '../validators.js';

/**
 * This helps with visualizing what a camera contains in its frustum,
 * corresponding [THREE.CameraHelper](https://threejs.org/docs/index.html#api/helpers/CameraHelper).
 * It visualizes the frustum of a camera using a LineSegments.
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** Name of the camera to visualize. */
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
