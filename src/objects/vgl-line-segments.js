import VglLine from './vgl-line';
import { LineSegments } from '../three';

/**
 * A series of lines component drawn between pairs of vertices,
 * corresponding [THREE.LineSegments](https://threejs.org/docs/index.html#api/objects/LineSegments).
 *
 * Properties of [VglLine](vgl-line) are also available as mixin.
 */

export default {
  mixins: [VglLine],
  computed: {
    inst: () => new LineSegments(),
  },
};
