import { ExtrudeBufferGeometry } from 'three';
import { boolean, number, shapes } from '../validators';
import VglGeometry from '../core/vgl-geometry';
import { parseShape } from '../parsers';

/**
 * A component for creating extruded geometry from a path shape,
 * corresponding [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** The Shape (or an Array of Shape)
     * Accepts an array of points to internally create the shape.
     * Points can either be String ("12 2"), Number ([12, 2]) or THREE.Vector2.
     *
     * For an array of shapes, please pass directly an Array of THREE.Shape
     */
    shapes,
    /** int. Number of points on the curves */
    curveSegments: number,
    /** int. Number of points used for subdividing segments
     * along the depth of the extruded spline
     */
    steps: number,
    /** float. Depth to extrude the shape */
    depth: number,
    /** Apply beveling to the shape */
    bevelEnabled: boolean,
    /** float. How deep into the original shape the bevel goes */
    bevelThickness: number,
    /** float. Distance from the shape outline that the bevel extends */
    bevelSize: number,
    /** float. Distance from the shape outline that the bevel starts */
    bevelOffset: number,
    /** int. Number of bevel layers */
    bevelSegments: number,
    /** THREE.Curve. A 3D spline path along which the shape should be extruded */
    extrudePath: Object,
    /**  Object that provides UV generator functions */
    UVGenerator: Object,
  },
  computed: {
    options() {
      const {
        curveSegments,
        steps,
        depth,
        bevelEnabled,
        bevelThickness,
        bevelSize,
        bevelOffset,
        bevelSegments,
        extrudePath,
        UVGenerator,
      } = this;
      return {
        ...(curveSegments != null && { curveSegments: parseInt(curveSegments, 10) }),
        ...(steps != null && { steps: parseInt(steps, 10) }),
        ...(depth != null && { depth: parseFloat(depth) }),
        ...(bevelEnabled != null && { bevelEnabled }),
        ...(bevelThickness != null && { bevelThickness: parseFloat(bevelThickness) }),
        ...(bevelSize != null && { bevelSize: parseFloat(bevelSize) }),
        ...(bevelOffset != null && { bevelOffset: parseFloat(bevelOffset) }),
        ...(bevelSegments != null && { bevelSegments: parseInt(bevelSegments, 10) }),
        ...(extrudePath != null && { extrudePath }),
        ...(UVGenerator != null && { UVGenerator }),
      };
    },
    inst() {
      return new ExtrudeBufferGeometry(
        parseShape(this.shapes),
        this.options,
      );
    },
  },
};
