import { Curve } from 'three';

export default {
  inject: {
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  computed: {
    inst: () => new Curve(),
  },
};
