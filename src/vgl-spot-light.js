import VglLight from "./vgl-light.js";
import {SpotLight, Vector3} from "./three.js";
import {parseVector3, findParent, validatePropNumber, parseFloat_} from "./utils.js";

export default {
    mixins: [VglLight],
    props: {
        distance: {
            type: validatePropNumber,
            default: 0
        },
        decay: {
            type: validatePropNumber,
            default: 1
        },
        angle: {
            type: validatePropNumber,
            default: Math.PI / 3
        },
        penumbra: {
            type: validatePropNumber,
            default: 0
        },
        target: {
            type: [String, Vector3]
        }
    },
    computed: {
        inst: () => new SpotLight()
    },
    created() {
        this.inst.distance = parseFloat_(this.distance);
        this.inst.decay = parseFloat_(this.decay);
        this.inst.angle = parseFloat_(this.angle);
        this.inst.penumbra = parseFloat_(this.penumbra);
        if (this.target) {
            parseVector3(this.target, this.inst.target.position);
            const $parent = findParent(this, "isVglObject3d");
            if ($parent) this.$watch(() => $parent.inst, (inst, old) => {
                if (old) old.remove(this.inst.target);
                inst.add(this.inst.target);
            }, {immediate: true});
        }
    },
    beforeDestroy() {
        if (this.inst.target.parent) this.inst.target.parent.remove(this.inst.target);
    },
    watch: {
        distance(distance) {
            this.inst.distance = parseFloat_(distance);
        },
        decay(decay) {
            this.inst.decay = parseFloat_(decay);
        },
        angle(angle) {
            this.inst.angle = parseFloat_(angle);
        },
        penumbra(penumbra) {
            this.inst.penumbra = parseFloat_(penumbra);
        },
        target(target) {
            parseVector3(target, this.inst.target.position);
        }
    }
};
