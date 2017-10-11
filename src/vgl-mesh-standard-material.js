import VglMaterial from "./vgl-material.js";
import {MeshStandardMaterial} from "./three.js";

export default {
    mixins: [VglMaterial],
    props: {
        color: {
            type: String,
            default: "#fff"
        }
    },
    computed: {
        inst: () => new MeshStandardMaterial()
    },
    created() {
        this.inst.color.setStyle(this.color);
    },
    watch: {
        color(color) {
            this.inst.color.setStyle(color);
        }
    }
};
