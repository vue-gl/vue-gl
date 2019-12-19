import { AxesHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { float } from '../types';

/**
 * An axis object to visualize the the 3 axes in a simple way,
 * corresponding [THREE.AxesHelper](https://threejs.org/docs/index.html#api/helpers/AxesHelper).
 * The X axis is red. The Y axis is green. The Z axis is blue.
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** Size of the lines representing the axes. */
    size: { type: float, default: 1 },
  },
  computed: {
    /** The THREE.AxesHelper instance. */
    inst() { return new AxesHelper(parseFloat(this.size)); },
  },
};
