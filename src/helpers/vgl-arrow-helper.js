import { ArrowHelper, Vector3 } from 'three';
import VglObject3d from '../core/vgl-object3d';
import {
  color, directionX, directionY, directionZ, headLength, headWidth, inst, length,
} from '../constants';

export default {
  extends: VglObject3d,
  props: {
    /** x-coodinate of the arrow direction. */
    [directionX]: { type: Number, default: 0 },
    /** y-coodinate of the arrow direction. */
    [directionY]: { type: Number, default: 0 },
    /** z-coodinate of the arrow direction. */
    [directionZ]: { type: Number, default: 1 },
    /** The arrow length. */
    [length]: { type: Number, default: 1 },
    /** The arrow color. */
    [color]: { type: [String, Number], default: 0xffff00 },
    /** The length of the arrow head. */
    [headLength]: Number,
    /** The width of the arrow head. */
    [headWidth]: Number,
  },
  computed: {
    /** The THREE.ArrowHelper instance. */
    [inst]: () => new ArrowHelper(),
  },
  watch: {
    [directionX]: {
      handler(x) {
        this[inst].setDirection(new Vector3(x, this[directionY], this[directionZ]).normalize());
      },
      immediate: true,
    },
    [directionY](y) {
      this[inst].setDirection(new Vector3(this[directionX], y, this[directionZ]).normalize());
    },
    [directionZ](z) {
      this[inst].setDirection(new Vector3(this[directionX], this[directionY], z).normalize());
    },
    [length]: {
      handler(len) { this[inst].setLength(len, this[headLength], this[headWidth]); },
      immediate: true,
    },
    [headLength](len) { this[inst].setLength(this[length], len, this[headWidth]); },
    [headWidth](w) { this[inst].setLength(this[length], this[headLength], w); },
    [color]: { handler(c) { this[inst].setColor(c); }, immediate: true },
  },
};
