import { OctahedronGeometry } from 'three';
import VglPolyhedronGeometry from './vgl-polyhedron-geometry';
import { detail, inst, radius } from '../constants';

export default {
  extends: VglPolyhedronGeometry,
  computed: {
    /** The THREE.OctahedronGeometry instance. */
    [inst]() { return new OctahedronGeometry(this[radius], this[detail]); },
  },
};
