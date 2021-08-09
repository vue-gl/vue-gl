import { Camera } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { inst } from '../constants';

export default {
  extends: VglObject3d,
  computed: {
    /** The THREE.Camera instance. */
    [inst]: () => new Camera(),
  },
};
