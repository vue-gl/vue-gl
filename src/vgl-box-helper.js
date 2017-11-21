import VglLineSegments from "./vgl-line-segments.js";
import {BoxHelper} from "./three.js";
import {validatePropString} from "./utils.js";

export default {
    mixins: [VglLineSegments],
    props: {
        color: {
            type: validatePropString,
            default: "#ff0"
        }
    },
    computed: {
        inst: () => new BoxHelper()
    },
    data() {
        return {
            uw: null
        };
    },
    created() {
        const inst = this.inst;
        const parent = inst.parent;
        if (parent) {
            this.uw = this.$watch(() => parent, (p) => {
                this.$nextTick(() => {
                    inst.setFromObject(p);
                });
            }, {immediate: true});
        }
    },
    beforeDestroy() {
        if (this.uw) this.uw();
    },
    watch: {
        color: {
            handler(color) {
                this.inst.material.color.setStyle(color);
            },
            immediate: true
        }
    }
};
