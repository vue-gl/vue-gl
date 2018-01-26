import VglObject3d from './vgl-object3d.js';
import { LensFlare } from './three.js';

export default {
  mixins: [VglObject3d],
  provide() {
    return {
      vglLensFlare: Object.defineProperties({}, {
        inst: { get: () => this.inst },
        update: { value: this.vglObject3d.update },
      }),
    };
  },
  computed: {
    inst: () => new LensFlare(),
  },
};
