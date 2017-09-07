import material from "./material";
import {LineBasicMaterial} from "three";

export default {
    mixins: [material],
    props: [
        "color"
    ],
    computed: {
        instance() {
            return new LineBasicMaterial();
        }
    },
    created() {
        this.instance.lights = this.lights;
        this.color && this.instance.color.set(this.color);
    },
    watch: {
        color(c) {
            this.instance.color.set(c);
        }
    }
};
