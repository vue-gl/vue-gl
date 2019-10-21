import { Scene } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { parseFog, parseColor } from '../parsers';
import { string, fog } from '../validators';

/**
 * This is where you place objects,
 * corresponding [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
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
  methods: {
    setBackgroundTexture() {
      const { vglNamespace: { textures }, inst, backgroundTexture } = this;
      if (backgroundTexture in textures.keys()) inst.background = textures.get(backgroundTexture);
    },
  },
  created() {
    const { vglNamespace: { beforeRender }, setBackgroundTexture } = this;
    beforeRender.unshift(setBackgroundTexture);
  },
  watch: {
    inst: {
      handler(inst) {
        this.vglNamespace.scenes.set(this.name, inst);
        if (this.fog) this.inst.fog = parseFog(this.fog);
        if (this.backgroundColor) this.inst.background = parseColor(this.backgroundColor);
        if (this.backgroundTexture) {
          this.inst.background = this.vglNamespace.textures.get(this.backgroundTexture) || null;
        }
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { scenes }, inst } = this;
      scenes.delete(oldName, inst);
      scenes.set(name, inst);
    },
    fog(newFog) {
      this.inst.fog = parseFog(newFog);
    },
    backgroundColor(color) {
      this.inst.background = parseColor(color);
    },
    backgroundTexture(name) {
      this.inst.background = this.vglNamespace.textures.get(name) || null;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { scenes, beforeRender }, inst, setBackgroundTexture } = this;
    scenes.delete(this.name, inst);
    beforeRender.splice(beforeRender.indexOf(setBackgroundTexture), 1);
  },
};
