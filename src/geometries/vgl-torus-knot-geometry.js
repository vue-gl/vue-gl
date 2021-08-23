import { TorusKnotGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  p, q, radialSegments, radius, tube, tubularSegments,
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
    [tubularSegments]: { type: Number, default: 64, validator: Number.isInteger },
    /** The winding times around the axis of rotational symmetry. */
    [p]: { type: Number, default: 2, validator: Number.isInteger },
    /** The winding times around a circle in the interior of the torus. */
    [q]: { type: Number, default: 3, validator: Number.isInteger },
  },
  computed: {
    /** The THREE.TorusKnotGeometry instance. */
    inst() {
      return new TorusKnotGeometry(
        this[radius], this[tube], this[tubularSegments], this[radialSegments], this[p], this[q],
      );
    },
  },
};
