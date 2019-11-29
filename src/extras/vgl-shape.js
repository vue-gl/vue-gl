import { Shape } from 'three';
import VglPath from './vgl-path';
import { parseVector2Array } from '../parsers';

export default {
  mixins: [VglPath],
  computed: {
    inst() {
      const shape = new Shape();
      if (this.path !== undefined) shape.setFromPoints(parseVector2Array(this.path));
      return shape;
    },
  },
};
