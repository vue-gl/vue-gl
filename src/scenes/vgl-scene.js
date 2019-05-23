import { Scene } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { parseFog, parseColor } from '../parsers';
import { string, fog } from '../validators';

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
    fog: {
      type: fog,
    },
    /**
     * Expecting to accept a string representing a color.
     * Will be overwrited by backgroundTexture prop if both props are set
    */
    backgroundColor: string,
    /** Expecting to accept a string representing a texture name. */
    backgroundTexture: string,
  },
  computed: {
    inst: () => new Scene(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.vglNamespace.scenes[this.name] = inst;
        if (this.fog) this.inst.fog = parseFog(this.fog);
        if (this.backgroundColor) this.inst.background = parseColor(this.backgroundColor);
        if (this.backgroundTexture) {
          this.inst.background = this.vglNamespace.textures[this.backgroundTexture] || null;
        }
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { scenes }, inst } = this;
      if (scenes[oldName] === inst) delete scenes[oldName];
      scenes[name] = inst;
    },
    fog(newFog) {
      this.inst.fog = parseFog(newFog);
    },
    backgroundColor(color) {
      this.inst.background = parseColor(color);
    },
    backgroundTexture(name) {
      this.inst.background = this.vglNamespace.textures[name] || null;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { scenes }, inst } = this;
    if (scenes[this.name] === inst) delete scenes[this.name];
  },
};
