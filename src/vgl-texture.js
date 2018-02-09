import { TextureLoader } from './three.js';
import { validatePropString } from './utils.js';

export default {
  inject: ['vglTextures'],
  props: {
    src: validatePropString,
    name: validatePropString,
  },
  data() {
    return { inst: null };
  },
  watch: {
    src: {
      handler(src) {
        new TextureLoader().load(src, (texture) => {
          this.inst = texture;
        });
      },
      immediate: true,
    },
    inst: {
      handler(inst) {
        this.$set(this.vglTextures.forSet, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglTextures.forGet[oldName] === this.inst) this.$delete(this.vglTextures.forSet, oldName);
      this.$set(this.vglTextures.forSet, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglTextures.forGet[this.name] === this.inst) this.$delete(this.vglTextures.forSet, this.name);
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};
