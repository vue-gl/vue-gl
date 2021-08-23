import { LineSegments } from 'three';
import VglLine from './vgl-line';
import { inst } from '../constants';

export default {
  mixins: [VglLine],
  computed: {
    /** The THREE.LineSegments instance. */
    [inst]: () => new LineSegments(),
  },
};
