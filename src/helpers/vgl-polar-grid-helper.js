import VglObject3d from '../core/vgl-object3d.js';
import { PolarGridHelper } from '../three.js';
import { number, string } from '../validators.js';

/**
 * A component to define polar grids,
 * correcponding [THREE.PolarGridHelper](https://threejs.org/docs/index.html#api/helpers/PolarGridHelper).
 * Grids are two-dimensional arrays of lines.
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** The radius of the polar grid. This can be any positive number. */
    radius: { type: number, default: 10 },
    /** The number of radial lines. This can be any positive integer. */
    radials: { type: number, default: 16 },
    /** The number of circles. This can be any positive integer. */
    circles: { type: number, default: 8 },
    /**
     * The number of line segments used for each circle.
     * This can be any positive integer that is 3 or greater.
     */
    divisions: { type: number, default: 64 },
    /** The first color used for grid elements. */
    color1: { type: string, default: '#444444' },
    /** The second color used for grid elements. */
    color2: { type: string, default: '#888888' },
  },
  computed: {
    inst() {
      return new PolarGridHelper(
        parseFloat(this.radius),
        parseInt(this.radials, 10),
        parseInt(this.circles, 10),
        parseInt(this.divisions, 10),
        this.color1,
        this.color2,
      );
    },
  },
};
