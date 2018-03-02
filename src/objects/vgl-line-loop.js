import VglLine from './vgl-line.js';
import { LineLoop } from '../three.js';

/**
 * A continuous line component that connects back to the start,
 * corresponding [THREE.LineLoop](https://threejs.org/docs/index.html#api/objects/LineLoop).
 *
 * Properties of [VglLine](vgl-line) are also available as mixin.
 */

export default {
  mixins: [VglLine],
  computed: {
    inst: () => new LineLoop(),
  },
};
