import { ExtrudeGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  add, bevelEnabled, bevelOffset, bevelSegments, bevelSize, bevelThickness, curveSegments, depth,
  extrudePath, inst, remove, shapes, steps, uvGenerator,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The number of points on the curves. */
    [curveSegments]: { type: Number, default: 12, validator: Number.isInteger },
    /** The number of segments along to the extruded spline depth. */
    [steps]: { type: Number, default: 1, validator: Number.isInteger },
    /** The depth of the extrusion. */
    [depth]: { type: Number, default: 50 },
    /** Wether to enable beveling or not. */
    [bevelEnabled]: Boolean,
    /** The bevel depth going into the shape. */
    [bevelThickness]: { type: Number, default: 10 },
    /** The distance from the shape outline that the bevel extends. */
    [bevelSize]: Number,
    /** The distance from the shape outline that the bevel starts. */
    [bevelOffset]: { type: Number, default: 0 },
    /** The number of bevel layers. */
    [bevelSegments]: { type: Number, default: 3, validator: Number.isInteger },
    /** An object that provides UV generator functions. */
    [uvGenerator]: Object,
  },
  data: () => ({ shapes: [], extrudePath: undefined }),
  computed: {
    /** The THREE.ExtrudeGeometry instance */
    [inst]() {
      return new ExtrudeGeometry(this.shapes, {
        curveSegments: this[curveSegments],
        steps: this[steps],
        depth: this[depth],
        bevelEnabled: this[bevelEnabled],
        bevelThickness: this[bevelThickness],
        bevelSize: this[bevelSize],
        bevelOffset: this[bevelOffset],
        bevelSegments: this[bevelSegments],
        extrudePath: this.extrudePath,
        UVGenerator: this[uvGenerator],
      });
    },
  },
  methods: {
    [add](slot, obj) {
      if (slot === shapes) this.shapes.push(obj);
      else if (slot === extrudePath) this.extrudePath = obj;
    },
    [remove](slot, obj) {
      if (slot === shapes) this.shapes.splice(this.shapes.indexOf(obj), 1);
      else if (slot === extrudePath && this.extrudePath === obj) this.extrudePath = undefined;
    },
  },
};
