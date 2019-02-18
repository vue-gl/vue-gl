import { PerspectiveCamera } from 'three';
import VglCamera from './vgl-camera';
import { number } from '../validators';

/**
 * Camera that uses perspective projection,
 * corresponding [THREE.PerspectiveCamera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera).
 * Camera frustum aspect ratio is automatically set to the renderer aspect ratio.
 *
 * Properties of [VglCamera](vgl-camera) are also available as mixin.
 */

export default {
  mixins: [VglCamera],
  props: {
    /** Zoom factor of the camera. */
    zoom: { type: number, default: 1 },
    /** Camera frustum near plane. */
    near: { type: number, default: 0.1 },
    /** Camera frustum far plane. */
    far: { type: number, default: 2000 },
    /** Camera frustum vertical field of view, from bottom to top of view, in degrees. */
    fov: { type: number, default: 50 },
  },
  computed: {
    inst: () => new PerspectiveCamera(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
          fov: parseFloat(this.fov),
        });
        inst.updateProjectionMatrix();
      },
      immediate: true,
    },
    zoom(zoom) { this.inst.zoom = parseFloat(zoom); this.inst.updateProjectionMatrix(); },
    near(near) { this.inst.near = parseFloat(near); this.inst.updateProjectionMatrix(); },
    far(far) { this.inst.far = parseFloat(far); this.inst.updateProjectionMatrix(); },
    fov(fov) { this.inst.fov = parseFloat(fov); this.inst.updateProjectionMatrix(); },
  },
};
