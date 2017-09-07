import material from "./material";
import {MeshStandardMaterial} from "three";

export default {
    mixins: [material],
    props: [
        "color"
    ],
    computed: {
        instance() {
            return new MeshStandardMaterial();
        }
    },
    created() {
        this.instance.color.setStyle(this.color || "#ffffff");
    },
    watch: {
        color(c) {
            this.instance.color.setStyle(c);
        }
    }
};
