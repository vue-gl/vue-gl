import { LineLoop } from 'three';
import VglLine from './vgl-line';

/**
 * A continuous line component that connects back to the start,
 * corresponding [THREE.LineLoop](https://threejs.org/docs/index.html#api/objects/LineLoop).
 *
 * Properties of [VglLine](vgl-line) are also available as mixin.
 */

export default {
  mixins: [VglLine],
  computed: {
    /** The THREE.LineLoop instance. */
    inst: () => new LineLoop(),
  },
};
