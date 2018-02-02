import VglMaterial from './vgl-material.js';
import { SpriteMaterial } from './three.js';
import { hasColorFactory, hasMap } from './mixins.js';

export default {
  mixins: [VglMaterial, hasColorFactory('#fff'), hasMap],
  inject: ['vglTextures'],
  computed: {
    inst: () => new SpriteMaterial(),
  },
};
