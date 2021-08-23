import { TetrahedronGeometry } from 'three';
import VglPolyhedronGeometry from './vgl-polyhedron-geometry';
import { detail, inst, radius } from '../constants';

export default {
  extends: VglPolyhedronGeometry,
  computed: {
    /** The THREE.TetrahedronGeometry instance. */
    [inst]() { return new TetrahedronGeometry(this[radius], this[detail]); },
  },
};
