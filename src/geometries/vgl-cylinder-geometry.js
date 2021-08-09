import { CylinderGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  height, heightSegments, inst, openEnded, radialSegments, radiusBottom, radiusTop, thetaLength,
  thetaStart,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The radius of the cylinder at its top. */
    [radiusTop]: { type: Number, default: 1 },
    /** The radius of the cylinder at its bottom. */
    [radiusBottom]: { type: Number, default: 1 },
    /** The height of the cylinder. */
    [height]: { type: Number, default: 1 },
    /** The number of segmented faces around the circumference of the cylinder. */
    [radialSegments]: { type: Number, default: 8, validator: Number.isInteger },
    /** The number of segmented faces along the height of the cylinder. */
    [heightSegments]: { type: Number, default: 1, validator: Number.isInteger },
    /** Whether ends of the cylinder are open or capped. */
    [openEnded]: Boolean,
    /** The start angle for the first segment. */
    [thetaStart]: { type: Number, default: 0 },
    /** The central angle of the circular sector. */
    [thetaLength]: { type: Number, default: Math.PI * 2 },
  },
  computed: {
    /** The THREE.CylinderGeometry instance. */
    [inst]() {
      return new CylinderGeometry(
        this[radiusTop], this[radiusBottom], this[height], this[radialSegments],
        this[heightSegments], this[openEnded], this[thetaStart], this[thetaLength],
      );
    },
  },
};
