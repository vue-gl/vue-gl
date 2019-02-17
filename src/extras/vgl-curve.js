import { Curve } from '../three';

export default {
  inject: ['vglNamespace'],
  computed: {
    inst: () => new Curve(),
  },
};
