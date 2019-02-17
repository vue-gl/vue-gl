import VglPath from './vgl-path';
import { Shape } from '../three';

export default {
  mixins: [VglPath],
  computed: {
    inst: () => new Shape(),
  },
};
