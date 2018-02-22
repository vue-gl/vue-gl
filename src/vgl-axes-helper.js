import VglObject3d from './vgl-object3d.js';
import { AxesHelper } from './three.js';
import { number } from './validators.js';

export default {
  mixins: [VglObject3d],
  props: {
    size: { type: number, default: 1 },
  },
  computed: {
    inst() { return new AxesHelper(parseFloat(this.size)); },
  },
};
