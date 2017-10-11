import VglObject3d from "./vgl-object3d.js";
import {Light} from "./three.js";
import {parseFloat_} from "./utils.js";

export default {
    mixins: [VglObject3d],
    props: {
        color: {
            type: String,
            default: "white"
        },
        intensity: {
            type: [String, Number],
            default: 1
        }
    },
    computed: {
        inst: () => new Light()
    },
    created() {
        this.inst.color.setStyle(this.color);
        this.inst.intensity = parseFloat_(this.intensity);
    },
    watch: {
        color(color) {
            this.inst.color.setStyle(color);
        },
        intensity(intensity) {
            this.inst.intensity = parseFloat_(intensity);
        }
    }
};
