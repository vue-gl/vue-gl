import { Sprite } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { defaultSpriteMaterial } from './defaults';
import {
  add, inst, material, remove,
} from '../constants';

export default {
  mixins: [VglObject3d],
  computed: {
    /** The THREE.Sprite instance. */
    [inst]: () => new Sprite(defaultSpriteMaterial),
  },
  methods: {
    [add](slot, obj) {
      if (slot === material) this[inst].material = obj;
      else VglObject3d.methods[add].call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === material) {
        if (this.inst.material === obj) this[inst].material = defaultSpriteMaterial;
      } else VglObject3d.methods[add].call(this, slot, obj);
    },
  },
};
