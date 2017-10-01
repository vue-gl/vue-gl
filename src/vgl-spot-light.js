import VglLight from "./vgl-light.js";
import {SpotLight} from "./three.js";
import {parseVector3} from "./utils.js";

export default {
    mixins: [VglLight],
    props: ["distance", "decay", "angle", "penumbra", "target"],
    computed: {
        inst: () => new SpotLight()
    },
    created() {
        if (this.distance) this.inst.distance = parseFloat(this.distance);
        if (this.decay !== undefined) this.inst.decay = parseFloat(this.decay);
        if (this.angle !== undefined) this.inst.angle = parseFloat(this.angle);
        if (this.penumbra) this.inst.penumbra = parseFloat(this.penumbra);
        if (this.target) {
            this.inst.target.position.copy(parseVector3(this.target));
            if (this.inst.parent) this.inst.parent.add(this.inst.target);
        }
    },
    beforeDestroy() {
        if (this.inst.target.parent) this.inst.target.parent.remove(this.inst.target);
    },
    watch: {
        distance(d) {
            this.inst.distance = parseFloat(d);
        },
        decay(d) {
            this.inst.decay = parseFloat(d);
        },
        angle(a) {
            this.inst.angle = parseFloat(a);
        },
        penumbra(p) {
            this.inst.penumbra = parseFloat(p);
        },
        target(target, oldTarget) {
            if (target) {
                this.inst.target.position.copy(parseVector3(target));
                if (oldTarget === undefined && this.inst.parent) {
                    this.inst.parent.add(this.inst.target);
                }
            }
        }
    }
};
