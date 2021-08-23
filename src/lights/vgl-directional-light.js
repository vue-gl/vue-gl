import { DirectionalLight } from 'three';
import VglLight from './vgl-light';
import { inst } from '../constants';

export default {
  extends: VglLight,
  computed: {
    /** The THREE.DirectionalLight instance. */
    [inst]: () => new DirectionalLight(),
  },
};
