import { PerspectiveCamera } from 'three';
import VglCamera from './vgl-camera';
import {
  aspect, far, fov, inst, near, zoom,
} from '../constants';

function assign(obj, assigns) {
  const { aspect: a } = Object.assign(obj, assigns);
  if (a !== undefined) obj.updateProjectionMatrix();
}

/**
 * This camera mimics the human eyes sight.
 *
 * When the `aspect` prop is omitted, it will be automatically set to fit the canvas size.
 */
export default {
  extends: VglCamera,
  props: {
    /** The zoom factor. */
    [zoom]: { type: Number, default: 1 },
    /** The camera frustum near plane. */
    [near]: { type: Number, default: 0.1 },
    /** The camera frustum far plane. */
    [far]: { type: Number, default: 2000 },
    /** The camera frustum vertical field in degrees. */
    [fov]: { type: Number, default: 50 },
    /** The camera frustum aspect ratio. */
    [aspect]: Number,
  },
  computed: {
    /** The THREE.PerspectiveCamera instance. */
    [inst]: () => new PerspectiveCamera(),
  },
  watch: {
    [zoom]: { handler(z) { assign(this[inst], { zoom: z }); }, immediate: true },
    [near]: { handler(n) { assign(this[inst], { near: n }); }, immediate: true },
    [far]: { handler(f) { assign(this[inst], { far: f }); }, immediate: true },
    [fov]: { handler(f) { assign(this[inst], { fov: f }); }, immediate: true },
    [aspect]: { handler(a) { assign(this[inst], { aspect: a }); }, immediate: true },
  },
};
