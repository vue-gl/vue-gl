import {assetFactory} from "./mixins.js";
import {Texture, TextureLoader} from "./three.js";
import {validatePropString} from "./utils.js";

export default {
    mixins: [assetFactory(Texture, "vglTextures")],
    inject: ["vglUpdate"],
    props: {
        src: validatePropString
    },
    computed: {
        inst() {
            return this.tex;
        }
    },
    data() {
        return {tex: new Texture()};
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            new TextureLoader().load(this.src, (texture) => {
                this.tex = texture;
                this.vglUpdate();
            });
        }
    },
    watch: {
        src() {
            this.load();
        }
    }
};
