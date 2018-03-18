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
  methods: {
    setHelper() {
      if (!this.inst.children.length) {
        this.inst.add(new CameraHelper(this.vglNamespace.cameras[this.camera]));
      } else {
        const [helper] = this.inst.children;
        helper.camera = this.vglNamespace.cameras[this.camera];
        helper.camera.updateProjectionMatrix();
        helper.update();
      }
    },
  },
  created() { this.vglNamespace.beforeRender.push(this.setHelper); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setHelper } = this;
    beforeRender.splice(beforeRender.indexOf(setHelper), 1);
  },
};
