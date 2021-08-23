import { OrthographicCamera } from 'three';
import VglCamera from './vgl-camera';
import {
  bottom, far, inst, left, near, right, top, zoom,
} from '../constants';

function assign(obj, assigns) {
  const {
    left: l, right: r, top: t, bottom: b,
  } = Object.assign(obj, assigns);
  if ([l, r, t, b].includes(undefined)) return;
  obj.updateProjectionMatrix();
}

/**
 * This camera projects the objects into constant size regardless of the distance.
 *
 * When more than 1 props of `left`, `right`, `top` or `bottom` are set, the camera frustum side
 * planes will be at specified coordinates. Otherwise they will be automatically set to fit the
 * canvas size.
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
    /** The camera frustum left edge. */
    [left]: Number,
    /** The camera frustum right edge. */
    [right]: Number,
    /** The camera frustum top edge. */
    [top]: Number,
    /** The camera frustum bottom edge. */
    [bottom]: Number,
  },
  computed: {
    /** The THREE.OrthographicCamera instance. */
    [inst]: () => new OrthographicCamera(),
  },
  watch: {
    [zoom]: { handler(z) { assign(this[inst], { zoom: z }); }, immediate: true },
    [near]: { handler(n) { assign(this[inst], { near: n }); }, immediate: true },
    [far]: { handler(f) { assign(this[inst], { far: f }); }, immediate: true },
    [left]: { handler(l) { assign(this[inst], { left: l }); }, immediate: true },
    [right]: { handler(r) { assign(this[inst], { right: r }); }, immediate: true },
    [top]: { handler(t) { assign(this[inst], { top: t }); }, immediate: true },
    [bottom]: { handler(b) { assign(this[inst], { bottom: b }); }, immediate: true },
  },
};
