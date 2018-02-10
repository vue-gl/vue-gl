import { TextureLoader } from './three.js';
import { validatePropString } from './utils.js';
import { textures } from './object-stores.js';

export default {
  inject: ['vglTextures'],
  props: {
    src: validatePropString,
    name: validatePropString,
  },
  data() { return { uuid: undefined }; },
  computed: {
    inst() { return this.uuid !== undefined ? textures[this.uuid] : null; },
  },
  watch: {
    src: {
      handler(src) {
        new TextureLoader().load(src, (texture) => {
          textures[texture.uuid] = texture;
          this.uuid = texture.uuid;
        });
      },
      immediate: true,
    },
    uuid(uuid, oldUuid) {
      if (oldUuid !== undefined) delete textures[oldUuid]; 
      this.$set(this.vglTextures.forSet, this.name, uuid);
    },
    name(name, oldName) {
      if (this.vglTextures.forGet[oldName] === this.uuid) this.$delete(this.vglTextures.forSet, oldName);
      this.$set(this.vglTextures.forSet, name, this.uuid);
    },
  },
  beforeDestroy() {
    delete textures[this.uuid];
    if (this.vglTextures.forGet[this.name] === this.uuid) this.$delete(this.vglTextures.forSet, this.name);
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};
