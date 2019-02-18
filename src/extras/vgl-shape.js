import { Shape } from 'three';
import VglPath from './vgl-path';

export default {
  mixins: [VglPath],
  computed: {
    inst: () => new Shape(),
  },
};
