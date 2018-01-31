import { VglMinimumRenderer } from './mixins.js';
import { FontLoader, Font } from './three.js';
import { string } from './constructor-arrays.js';

export default {
  mixins: [VglMinimumRenderer],
  inject: ['vglNamespace'],
  props: {
    src: string,
    name: string,
  },
  data() {
    return { inst: new Font({}) };
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.fonts, this.name, inst);
      },
      immediate: true,
    },
    src: {
      handler(src) {
        new FontLoader().load(src, (font) => {
          if (src === this.src) {
            this.inst = font;
          }
        });
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.fonts[oldName] === this.inst) {
        this.$delete(this.vglNamespace.fonts, oldName);
      }
      this.$set(this.vglNamespace.fonts, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglNamespace.fonts[this.name] === this.inst) {
      this.$delete(this.vglNamespace.fonts, this.name);
    }
  },
};
