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
    fog,
    /**
     * Expecting to accept a string representing a color.
     * Will be overwrited by backgroundTexture prop if both props are set
    */
    backgroundColor: string,
    /** Expecting to accept a string representing a texture name. */
    backgroundTexture: string,
  },
  computed: {
    /** The THREE.Scene instance. */
    inst: () => new Scene(),
  },
  methods: {
    /** Set scene's background property to given texture. */
    setBackgroundTexture(texture) {
      this.inst.background = texture || null;
      this.vglObject3d.emit();
    },
    /** Emit an event in the `scenes` namespace. */
    emitAsScene() { this.vglNamespace.scenes.emit(this.name, this.inst); },
  },
  created() {
    this.vglObject3d.listen(this.emitAsScene);
  },
  beforeDestroy() {
    if (this.backgroundTexture !== undefined) {
      this.vglNamespace.textures.unlisten(this.backgroundTexture, this.setBackgroundTexture);
    }
    this.vglNamespace.scenes.delete(this.name, this.inst);
    this.vglObject3d.unlisten(this.emitAsScene);
  },
  watch: {
    inst: {
      handler(inst) {
        if (this.fog !== undefined) this.inst.fog = parseFog(this.fog);
        if (this.backgroundColor !== undefined) {
          this.inst.background = parseColor(this.backgroundColor);
        }
        if (this.backgroundTexture !== undefined) {
          this.setBackgroundTexture(this.vglNamespace.textures.get(this.backgroundTexture));
        }
        this.vglNamespace.scenes.set(this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      this.vglNamespace.scenes.delete(oldName, this.inst);
      this.vglNamespace.scenes.set(name, this.inst);
    },
    fog(newFog) {
      this.inst.fog = parseFog(newFog);
      this.vglObject3d.emit();
    },
    backgroundColor(color) {
      this.inst.background = parseColor(color);
      this.vglObject3d.emit();
    },
    backgroundTexture: {
      handler(name, oldName) {
        if (oldName !== undefined) {
          this.vglNamespace.textures.unlisten(oldName, this.setBackgroundTexture);
        }
        if (name !== undefined) {
          this.vglNamespace.textures.listen(name, this.setBackgroundTexture);
          this.setBackgroundTexture(this.vglNamespace.textures.get(name));
        }
      },
      immediate: true,
    },
  },
};
