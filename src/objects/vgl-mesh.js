import { Mesh } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { defaultGeometry, defaultMeshMaterial } from './defaults';
import {
  add, geometry, inst, material, remove,
} from '../constants';

export default {
  mixins: [VglObject3d],
  computed: {
    /** The THREE.Mesh instance. */
    [inst]: () => new Mesh(defaultGeometry, defaultMeshMaterial),
  },
  methods: {
    [add](slot, obj) {
      if (slot === geometry) this[inst].geometry = obj;
      else if (slot === material) {
        if (Array.isArray(this[inst].material)) this[inst].material.push(obj);
        else if (this[inst].material === defaultMeshMaterial) this[inst].material = obj;
        else this[inst].material = [this[inst].material, obj];
      } else VglObject3d.methods[add].call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === geometry) {
        if (this[inst].geometry === obj) this[inst].geometry = defaultGeometry;
      } else if (slot === material) {
        if (Array.isArray(this[inst].material)) {
          const index = this[inst].material.indexOf(obj);
          if (index >= 0) {
            this[inst].material.splice(index, 1);
            if (this[inst].material.length === 1) [this[inst].material] = this[inst].material;
          }
        } else if (this[inst].material === obj) this[inst].material = defaultMeshMaterial;
      } else VglObject3d.methods[remove].call(this, slot, obj);
    },
  },
  /**
   * @slot geometry
   */
  /**
   * @slot material
   */
  render: undefined,
};
