import { CameraHelper, Object3D } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { string } from '../validators';

/**
 * This helps with visualizing what a camera contains in its frustum,
 * corresponding [THREE.CameraHelper](https://threejs.org/docs/index.html#api/helpers/CameraHelper).
 * It visualizes the frustum of a camera using a LineSegments.
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** Name of the camera to visualize. */
    camera: string,
  },
  computed: {
    inst() {
      const camera = this.vglNamespace.cameras.get(this.camera);
      return camera && new CameraHelper(camera) || new Object3D();
    },
  },
  watch: {
    camera: {
      handler(name, oldName) {
        if (oldName !== undefined) this.vglNamespace.cameras.unlisten(oldName, this.update);
        this.vglNamespace.cameras.listen(name, this.update);
      },
      immediate: true,
    },
  },
  methods: {
    update(camera) {
      if (!camera || !(this.inst instanceof CameraHelper)) return;
      camera.updateProjectionMatrix();
      this.inst.camera = camera;
      this.inst.update();
    },
  },
  beforeDestroy() { this.vglNamespace.cameras.unlisten(this.camera, this.update); },
};
