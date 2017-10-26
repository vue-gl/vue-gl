import VglMaterial from "./vgl-material.js";
import {MeshStandardMaterial} from "./three.js";
import {validatePropString} from "./utils.js";

export default {
    mixins: [VglMaterial],
    props: {
        color: {
            type: validatePropString,
            default: "#fff"
        },
        map: validatePropString
    },
    inject: ["vglTextures"],
    computed: {
        inst: () => new MeshStandardMaterial(),
        tex() {
            return this.map ? this.vglTextures.forGet[this.map]: null;
        }
    },
    created() {
        this.inst.color.setStyle(this.color);
        this.inst.map = this.tex;
    },
    watch: {
        color(color) {
            this.inst.color.setStyle(color);
        },
        tex(texture) {
            this.inst.map = texture;
        }
    }
};
