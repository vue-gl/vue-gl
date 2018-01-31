import { VglMinimumRenderer } from './mixins.js';
import { TextureLoader } from './three.js';
import { string } from './constructor-arrays.js';

export default {
  mixins: [VglMinimumRenderer],
  inject: ['vglNamespace'],
  props: {
    src: string,
    name: string,
  },
  computed: {
    inst() {
      return new TextureLoader().load(this.src);
    },
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.textures, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.textures[oldName] === this.inst) {
        this.$delete(this.vglNamespace.textures, oldName);
      }
      this.$set(this.vglNamespace.textures, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglNamespace.textures[this.name] === this.inst) {
      this.$delete(this.vglNamespace.textures, this.name);
    }
  },
};
