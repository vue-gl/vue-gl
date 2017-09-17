import VglMaterial from "./vgl-material.js";
import {MeshStandardMaterial} from "./three.js";

export default {
    mixins: [VglMaterial],
    props: ["color"],
    computed: {
        inst: () => new MeshStandardMaterial()
    },
    created() {
        if (this.color) this.inst.color.setStyle(this.color);
    },
    watch: {
        color(c) {
            this.inst.color.setStyle(c);
        }
    }
};
