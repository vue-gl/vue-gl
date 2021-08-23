import { BoxGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  depth, depthSegments, height, heightSegments, width, widthSegments,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The width of the box, or the side length on the X axis. */
    [width]: { type: Number, default: 1 },
    /** The height of the box, or the side length on the Y axis. */
    [height]: { type: Number, default: 1 },
    /** The depth of the box, or the side length on the Z axis. */
    [depth]: { type: Number, default: 1 },
    /** The number of segmented faces along the width direction. */
    [widthSegments]: { type: Number, default: 1, validator: Number.isInteger },
    /** The number of segmented faces along the height direction. */
    [heightSegments]: { type: Number, default: 1, validator: Number.isInteger },
    /** The number of segmented faces along the depth direction. */
    [depthSegments]: { type: Number, default: 1, validator: Number.isInteger },
  },
  computed: {
    /** The THREE.BoxGeometry instance. */
    inst() {
      return new BoxGeometry(
        this[width], this[height], this[depth],
        this[widthSegments], this[heightSegments], this[depthSegments],
      );
    },
  },
};
