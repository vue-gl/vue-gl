import VglLight from "./vgl-light.js";
import {PointLight} from "./three.js";

export default {
    mixins: [VglLight],
    props: ["distance", "decay"],
    computed: {
        inst: () => new PointLight()
    },
    created() {
        if (this.distance) this.inst.distance = parseFloat(this.distance);
        if (this.decay !== undefined) this.inst.decay = parseFloat(this.decay);
    },
    watch: {
        distance(d) {
            this.inst.distance = parseFloat(d);
        },
        decay(d) {
            this.inst.decay = parseFloat(d);
        }
    }
};
