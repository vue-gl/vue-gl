import { Scene } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { parseFog } from '../parsers';
import { string } from '../validators';

/**
 * This is where you place objects,
 * corresponding [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** the color, near and far parameters of the scene's fog */
    fog: string,
  },
  computed: {
    inst: () => new Scene(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.vglNamespace.scenes[this.name] = inst;
        if (this.fog) this.inst.fog = parseFog(this.fog);
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { scenes }, inst } = this;
      if (scenes[oldName] === inst) delete scenes[oldName];
      scenes[name] = inst;
    },
    fog(fog) {
      this.inst.fog = parseFog(fog);
    },
  },
  beforeDestroy() {
    const { vglNamespace: { scenes }, inst } = this;
    if (scenes[this.name] === inst) delete scenes[this.name];
  },
};
