import VglLight from "./vgl-light.js";
import {PointLight} from "./three.js";
import {parseFloat_} from "./utils.js";

const validator = [String, Number];

export default {
    mixins: [VglLight],
    props: {
        distance: {
            type: validator,
            default: 0
        },
        decay: {
            type: validator,
            default: 1
        }
    },
    computed: {
        inst: () => new PointLight()
    },
    created() {
        this.inst.distance = parseFloat_(this.distance);
        this.inst.decay = parseFloat_(this.decay);
    },
    watch: {
        distance(distance) {
            this.inst.distance = parseFloat_(distance);
        },
        decay(decay) {
            this.inst.decay = parseFloat_(decay);
        }
    }
};
