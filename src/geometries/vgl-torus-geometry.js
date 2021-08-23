import { TorusGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  arc, radialSegments, radius, tube, tubularSegments,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The radius of the torus. */
    [radius]: { type: Number, default: 1 },
    /** The diamiter of the tube. */
    [tube]: { type: Number, default: 0.4 },
    /** The number of segments of the tube section. */
    [radialSegments]: { type: Number, default: 8, validator: Number.isInteger },
    /** The number of segments along to the tube length direction. */
    [tubularSegments]: { type: Number, default: 6, validator: Number.isInteger },
    /** The central angle of a part of torus. */
    [arc]: { type: Number, default: Math.PI * 2 },
  },
  computed: {
    /** The THREE.TorusGeometry instance. */
    inst() {
      return new TorusGeometry(
        this[radius], this[tube], this[radialSegments], this[tubularSegments], this[arc],
      );
    },
  },
};
