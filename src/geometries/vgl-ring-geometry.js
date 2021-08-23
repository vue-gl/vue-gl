import { RingGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  innerRadius, outerRadius, phiSegments, thetaLength, thetaSegments, thetaStart,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The inner radius of the ring. */
    [innerRadius]: { type: Number, default: 0.5 },
    /** The outer radius of the ring. */
    [outerRadius]: { type: Number, default: 1 },
    /** The number of segments along to the tangential direction. */
    [thetaSegments]: { type: Number, default: 8, validator: Number.isInteger },
    /** The number of segments along to the radial direction. */
    [phiSegments]: { type: Number, default: 1, validator: Number.isInteger },
    /** The starting angle. */
    [thetaStart]: { type: Number, default: 0 },
    /** The central angle. */
    [thetaLength]: { type: Number, default: Math.PI * 2 },
  },
  computed: {
    /** The THREE.RingGeometry instance. */
    inst() {
      return new RingGeometry(
        this[innerRadius], this[outerRadius], this[thetaSegments], this[phiSegments],
        this[thetaStart], this[thetaLength],
      );
    },
  },
};
