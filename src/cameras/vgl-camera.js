import { Camera } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { inst } from '../constants';

/**
 * An abstract camera component.
 */
export default {
  extends: VglObject3d,
  computed: {
    /** The THREE.Camera instance. */
    [inst]: () => new Camera(),
  },
};
