import { AmbientLight } from 'three';
import VglLight from './vgl-light';
import { inst } from '../constants';

export default {
  extends: VglLight,
  computed: {
    /** The THREE.AmbientLight instance. */
    [inst]: () => new AmbientLight(),
  },
};
