import { ShadowMaterial } from 'three';
import VglMaterial from './vgl-material';
import { inst } from '../constants';

export default {
  mixins: [VglMaterial],
  computed: {
    /** The THREE.ShadowMaterial instance. */
    [inst]: () => new ShadowMaterial(),
  },
};
