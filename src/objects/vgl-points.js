import { Points } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { defaultGeometry, defaultPointsMaterial } from './defaults';
import {
  add, geometry, inst, material, remove,
} from '../constants';

export default {
  mixins: [VglObject3d],
  computed: {
    /** The THREE.Points instance. */
    [inst]: () => new Points(defaultGeometry, defaultPointsMaterial),
  },
  methods: {
    [add](slot, obj) {
      if (slot === geometry) this[inst].geometry = obj;
      else if (slot === material) this[inst].material = obj;
      else VglObject3d.methods[add].call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === geometry) {
        if (this[inst].geometry === obj) this[inst].geometry = defaultGeometry;
      } else if (slot === material) {
        if (this[inst].material === obj) this[inst].material = defaultPointsMaterial;
      } else VglObject3d.methods[remove].call(this, slot, obj);
    },
  },
};
