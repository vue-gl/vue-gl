import { assetFactory } from './mixins.js';
import { FontLoader } from './three.js';
import { validatePropString } from './utils.js';

export default {
  mixins: [assetFactory(null, 'vglFonts')],
  props: {
    src: validatePropString,
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
  },
};
