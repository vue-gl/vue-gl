import { LineLoop } from 'three';
import VglLine from './vgl-line';
import { inst } from '../constants';

export default {
  mixins: [VglLine],
  computed: {
    /** The THREE.LineLoop instance. */
    [inst]: () => new LineLoop(),
  },
};
