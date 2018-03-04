import { Curve } from '../three.js';

export default {
  inject: ['vglNamespace'],
  computed: {
    inst: () => new Curve(),
  },
};
