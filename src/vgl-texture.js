import {assetFactory} from "./mixins.js";
import {Texture, TextureLoader} from "./three.js";
import {validatePropString} from "./utils.js";

const defaultTexture = new Texture();

export default {
    mixins: [assetFactory(null, "vglTextures")],
    props: {
        src: validatePropString
    },
    data() {
        return {inst: defaultTexture};
    },
    watch: {
        src: {
            handler(src) {
                new TextureLoader().load(src, (texture) => {
                    this.inst = texture;
                });
            },
            immediate: true
        }
    }
};
