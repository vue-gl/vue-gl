import { PolarGridHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { float, int, color } from '../types';

/**
 * A component to define polar grids,
 * correcponding [THREE.PolarGridHelper](https://threejs.org/docs/index.html#api/helpers/PolarGridHelper).
 * Grids are two-dimensional arrays of lines.
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** The radius of the polar grid. This can be any positive number. */
    radius: { type: float, default: 10 },
    /** The number of radial lines. This can be any positive integer. */
    radials: { type: int, default: 16 },
    /** The number of circles. This can be any positive integer. */
    circles: { type: int, default: 8 },
    /**
     * The number of line segments used for each circle.
     * This can be any positive integer that is 3 or greater.
     */
    divisions: { type: int, default: 64 },
    /** The first color used for grid elements. */
    color1: { type: color, default: '#444444' },
    /** The second color used for grid elements. */
    color2: { type: color, default: '#888888' },
  },
  computed: {
    /** The THREE.PolarGridHelper instance. */
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
