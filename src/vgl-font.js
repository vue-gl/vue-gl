import { FontLoader } from './three.js';
import { validatePropString } from './utils.js';

export default {
  inject: ['vglFonts'],
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
        if (!/^data:.*?(?:;base64)?,.*$/.test(src)) {
          // GET src data manually and pass as a data URI.
          const xhr = new XMLHttpRequest();
          xhr.addEventListener('load', () => {
            new FontLoader().load(`data:,${encodeURIComponent(xhr.responseText)}`, (font) => {
              this.inst = font;
            });
          }, false);
          xhr.open('GET', src);
          xhr.send();
        } else {
          new FontLoader().load(src, (font) => {
            this.inst = font;
          });
        }
      },
      immediate: true,
    },
    inst: {
      handler(inst) {
        this.$set(this.vglFonts.forSet, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglFonts.forGet[oldName] === this.inst) this.$delete(this.vglFonts.forSet, oldName);
      this.$set(this.vglFonts.forSet, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglFonts.forGet[this.name] === this.inst) this.$delete(this.vglFonts.forSet, this.name);
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
