import { Line, LineDashedMaterial } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { defaultGeometry, defaultLineMaterial } from './defaults';
import {
  add, geometry, inst, material, remove,
} from '../constants';

export default {
  mixins: [VglObject3d],
  computed: {
    /** The THREE.Line instance. */
    [inst]: () => new Line(),
  },
  methods: {
    [add](slot, obj) {
      if (slot === geometry) {
        this[inst].geometry = obj;
        if (this[inst].material instanceof LineDashedMaterial) this[inst].computeLineDistances();
      } else if (slot === material) {
        this[inst].material = obj;
        if (obj instanceof LineDashedMaterial) this[inst].computeLineDistances();
      } else VglObject3d.methods[add].call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === geometry) {
        if (this[inst].geometry === obj) {
          this[inst].geometry = defaultGeometry;
          if (this[inst].material instanceof LineDashedMaterial) this[inst].computeLineDistances();
        }
      } else if (slot === material && this[inst].material === obj) {
        this[inst].material = defaultLineMaterial;
      } else VglObject3d.methods[remove].call(this, slot, obj);
    },
  },
};
