import { ExtrudeBufferGeometry } from 'three';
import {
  boolean, float, int, names,
} from '../types';
import { validateNames } from '../validators';
import { VglGeometryWithShapes } from '../mixins';

/**
 * A component for creating extruded geometry from a path shape,
 * corresponding [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometryWithShapes],
  props: {
    /** The Shape names */
    shapes: { type: names, validator: validateNames },
    /** int. Number of points on the curves */
    curveSegments: int,
    /** int. Number of points used for subdividing segments
     * along the depth of the extruded spline
     */
    steps: int,
    /** float. Depth to extrude the shape */
    depth: float,
    /** Apply beveling to the shape */
    bevelEnabled: boolean,
    /** float. How deep into the original shape the bevel goes */
    bevelThickness: float,
    /** float. Distance from the shape outline that the bevel extends */
    bevelSize: float,
    /** float. Distance from the shape outline that the bevel starts */
    bevelOffset: float,
    /** int. Number of bevel layers */
    bevelSegments: int,
    /** THREE.Curve. A 3D spline path along which the shape should be extruded */
    extrudePath: Object,
    /**  Object that provides UV generator functions */
    uvGenerator: Object,
  },
  computed: {
    /** The object containing the parameters to be passed to ExtrudeBufferGeometry constructor */
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
        uvGenerator,
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
        ...(uvGenerator != null && { UVGenerator: uvGenerator }),
      };
    },
    /** The THREE.ExtrudeBufferGeometry instance */
    inst() {
      return new ExtrudeBufferGeometry(this.shapeObjects, this.options);
    },
  },
};
