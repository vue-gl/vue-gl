import VglObject3d from "./vgl-object3d.js";
import {Light} from "./three.js";

export default {
    mixins: [VglObject3d],
    props: ["color", "intensity"],
    computed: {
        inst: () => new Light()
    },
    created() {
        if (this.color) this.inst.color.setStyle(this.color);
        if (this.intensity) this.inst.intensity = parseFloat(this.intensity);
    },
    watch: {
        color(clr) {
            this.inst.color.setStyle(clr);
        },
        intensity(intens) {
            this.inst.intensity = parseFloat(intens);
        }
    }
};
