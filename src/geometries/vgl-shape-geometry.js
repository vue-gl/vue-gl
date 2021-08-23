import { ShapeGeometry } from 'three';
import VglGeometry from '../core/vgl-geometry';
import {
  add, curveSegments, inst, remove, shapes,
} from '../constants';

export default {
  extends: VglGeometry,
  props: {
    /** The number of segments per shape. */
    [curveSegments]: { type: Number, default: 12, validator: Number.isInteger },
  },
  data: () => ({ shapes: [] }),
  computed: {
    /** The THREE.ShapeGeometry instance */
    [inst]() { return new ShapeGeometry(this.shapes, this[curveSegments]); },
  },
  methods: {
    [add](slot, obj) { if (slot === shapes) this.shapes.push(obj); },
    [remove](slot, obj) { if (slot === shapes) this.shapes.splice(this.shapes.indexOf(obj), 1); },
  },
};
