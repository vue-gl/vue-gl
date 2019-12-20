import { ExtrudeBufferGeometry } from 'three';
import {
  boolean, float, int, names,
} from '../types';
import VglGeometry from '../core/vgl-geometry';
import { parseNames } from '../parsers';
import { validateNames } from '../validators';

/**
 * A component for creating extruded geometry from a path shape,
 * corresponding [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry).
 *
 * Properties of [VglGeometry](../core/vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
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
  data: () => ({
    shapeNames: [],
  }),
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
    inst() {
      const shapes = this.shapeNames.map(([name]) => this.vglNamespace.curves.get(name));
      return new ExtrudeBufferGeometry(shapes, this.options);
    },
  },
  methods: {
    /** Update the array of Shape names and Shape UUIDs and emit an event. */
    setShapeNames() {
      const shapeNames = parseNames(this.shapes);
      this.shapeNames = shapeNames
        .map((shapeName) => [shapeName, this.vglNamespace.curves.get(shapeName).uuid]);
      this.update();
    },
  },
  beforeDestroy() {
    if (this.shapes !== undefined) {
      const shapeNames = parseNames(this.shapes);
      shapeNames.forEach((shapeName) => {
        this.vglNamespace.curves.unlisten(shapeName, this.setShapeUuids);
      });
    }
  },
  watch: {
    shapes: {
      handler(shapes, oldShapes) {
        const oldNames = oldShapes === undefined ? [] : parseNames(oldShapes);
        const newNames = shapes === undefined ? [] : parseNames(shapes);
        oldNames.forEach((shapeName) => {
          if (!newNames.includes(shapeName)) {
            this.vglNamespace.curves.unlisten(shapeName, this.setShapeNames);
          }
        });
        names.forEach((shapeName) => {
          if (!oldNames.includes(shapeName)) {
            this.vglNamespace.curves.listen(shapeName, this.setShapeNames);
          }
        });
        if (shapes !== undefined) this.setShapeNames();
      },
      immediate: true,
    },
  },
};
