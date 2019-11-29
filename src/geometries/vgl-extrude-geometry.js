import { ExtrudeBufferGeometry } from 'three';
import { boolean, number, string } from '../validators';
import VglGeometry from '../core/vgl-geometry';
import { parseArray } from '../parsers';

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
    shapes: string,
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
      const names = parseArray(this.shapes);
      this.shapeNames = names.map((name) => [name, this.vglNamespace.curves.get(name).uuid]);
      this.update();
    },
  },
  beforeDestroy() {
    if (this.shapes !== undefined) {
      const names = parseArray(this.shapes);
      names.forEach((name) => this.vglNamespace.curves.unlisten(name, this.setShapeUuids));
    }
  },
  watch: {
    shapes: {
      handler(shapes, oldShapes) {
        const oldNames = oldShapes === undefined ? [] : parseArray(oldShapes);
        const names = shapes === undefined ? [] : parseArray(shapes);
        oldNames.forEach((name) => {
          if (!names.includes(name)) this.vglNamespace.curves.unlisten(name, this.setShapeNames);
        });
        names.forEach((name) => {
          if (!oldNames.includes(name)) this.vglNamespace.curves.listen(name, this.setShapeNames);
        });
        if (shapes !== undefined) this.setShapeNames();
      },
      immediate: true,
    },
  },
};
