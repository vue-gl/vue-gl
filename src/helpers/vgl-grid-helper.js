import VglObject3d from '../core/vgl-object3d.js';
import { GridHelper } from '../three.js';
import { number, string } from '../validators.js';

/**
 * A component to define grids,
 * corresponding [THREE.GridHelper](https://threejs.org/docs/index.html#api/helpers/GridHelper).
 * Grids are two-dimensional arrays of lines.
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** The size of the grid. */
    size: { type: number, default: 10 },
    /** The number of divisions across the grid. */
    divisions: { type: number, default: 10 },
    /** The color of the centerline. */
    colorCenterLine: { type: string, default: '#444444' },
    /** The color of the lines of the grid. */
    colorGrid: { type: string, default: '#888888' },
  },
  computed: {
    inst() {
      return new GridHelper(
        parseFloat(this.size),
        parseInt(this.divisions, 10),
        this.colorCenterLine,
        this.colorGrid,
      );
    },
  },
};
