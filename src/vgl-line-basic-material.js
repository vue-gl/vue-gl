import VglMaterial from "./vgl-material.js";
import {LineBasicMaterial} from "./three.js";

export default {
    mixins: [VglMaterial],
    props: ["color", "lights"],
    computed: {
        inst: () => new LineBasicMaterial()
    },
    created() {
        if (this.lights) this.inst.lights = this.lights;
        if (this.color) this.inst.color.setStyle(this.color);
    },
    watch: {
        color(cl) {
            this.inst.color.setStyle(cl);
        },
        lights(li) {
            this.inst.lights = li;
        }
    }
};
