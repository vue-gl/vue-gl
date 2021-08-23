import { DodecahedronGeometry } from 'three';
import VglPolyhedronGeometry from './vgl-polyhedron-geometry';
import { detail, inst, radius } from '../constants';

export default {
  extends: VglPolyhedronGeometry,
  computed: {
    /** The THREE.DodecahedronGeometry instance. */
    [inst]() { return new DodecahedronGeometry(this[radius], this[detail]); },
  },
};
