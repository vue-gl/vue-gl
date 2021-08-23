import { Group } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { inst } from '../constants';

export default {
  mixins: [VglObject3d],
  computed: {
    /** The THREE.Group instance. */
    [inst]: () => new Group(),
  },
};
