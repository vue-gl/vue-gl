import {assetFactory} from "./mixins.js";
import {FontLoader} from "./three.js";
import {validatePropString} from "./utils.js";

export default {
    mixins: [assetFactory(null, "vglFonts")],
    props: {
        src: validatePropString
    },
    data() {
        return {inst: null};
    },
    watch: {
        src: {
            handler(src) {
                new FontLoader().load(src, (font) => {
                    this.inst = font;
                });
            },
            immediate: true
        }
    }
};
