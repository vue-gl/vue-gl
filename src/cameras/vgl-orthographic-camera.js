import { OrthographicCamera } from 'three';
import VglCamera from './vgl-camera';
import { float } from '../types';

/**
 * Camera that uses orthographic projection,
 * corresponding [THREE.OrthographicCamera](https://threejs.org/docs/index.html#api/cameras/OrthographicCamera).
 * Camera frustum top, bottom, left, and right planes are automatically set to the renderer size.
 *
 * Properties of [VglCamera](vgl-camera) are also available as mixin.
 */

export default {
  mixins: [VglCamera],
  props: {
    /** Zoom factor of the camera. */
    zoom: { type: float, default: 1 },
    /** Camera frustum near plane. */
    near: { type: float, default: 0.1 },
    /** Camera frustum far plane. */
    far: { type: float, default: 2000 },
  },
  computed: {
    /** The THREE.OrthographicCamera instance. */
    inst: () => new OrthographicCamera(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
        });
      },
      immediate: true,
    },
    zoom(zoom) {
      this.inst.zoom = parseFloat(zoom);
      this.vglObject3d.emit();
    },
    near(near) {
      this.inst.near = parseFloat(near);
      this.vglObject3d.emit();
    },
    far(far) {
      this.inst.far = parseFloat(far);
      this.vglObject3d.emit();
    },
  },
};
