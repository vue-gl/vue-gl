import { CameraHelper, Object3D } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { name } from '../types';
import { validateName } from '../validators';

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
    camera: { type: name, required: true, validator: validateName },
  },
  data: () => ({
    /** If camera specified by the name exists or not. Do not set this data manually. */
    exist: false,
  }),
  computed: {
    /**
     * The THREE.CameraHelper instance. If any cameras specified by the name, it returns a
     * THREE.Object3D instance.
     */
    inst() {
      if (!this.exist) return new Object3D();
      const camera = this.vglNamespace.cameras.get(this.camera);
      camera.updateProjectionMatrix();
      return new CameraHelper(camera);
    },
  },
  methods: {
    /** Update the helper geometry for given camera object. */
    update(camera) {
      if (!camera) {
        this.exist = false;
        return;
      }
      this.exist = true;
      camera.updateProjectionMatrix();
      this.inst.camera = camera;
      this.inst.update();
      this.vglObject3d.emit();
    },
  },
  beforeDestroy() {
    this.vglNamespace.cameras.unlisten(this.camera, this.update);
  },
  watch: {
    camera: {
      handler(newName, oldName) {
        if (oldName !== undefined) this.vglNamespace.cameras.unlisten(oldName, this.update);
        this.vglNamespace.cameras.listen(newName, this.update);
        this.exist = !!this.vglNamespace.cameras.get(newName);
      },
      immediate: true,
    },
  },
};
