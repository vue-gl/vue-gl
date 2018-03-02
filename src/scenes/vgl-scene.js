import VglObject3d from '../core/vgl-object3d.js';
import { Scene } from '../three.js';

/**
 * This is where you place objects,
 * corresponding [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  computed: {
    inst: () => new Scene(),
  },
  watch: {
    inst: {
      handler(inst) { this.vglNamespace.scenes[this.name] = inst; },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { scenes }, inst } = this;
      if (scenes[oldName] === inst) delete scenes[oldName];
      scenes[name] = inst;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { scenes }, inst } = this;
    if (scenes[this.name] === inst) delete scenes[this.name];
  },
};
