import { IcosahedronGeometry } from 'three';
import VglPolyhedronGeometry from './vgl-polyhedron-geometry';
import { detail, inst, radius } from '../constants';

export default {
  extends: VglPolyhedronGeometry,
  computed: {
    /** The THREE.IcosahedronGeometry instance. */
    [inst]() { return new IcosahedronGeometry(this[radius], this[detail]); },
  },
};
