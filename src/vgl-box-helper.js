import VglLineSegments from "./vgl-line-segments.js";
import {BoxHelper} from "./three.js";
import {validatePropString, findParent} from "./utils.js";

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
            uw: null,
            r: true
        };
    },
    created() {
        const inst = this.inst;
        if (inst.parent) {
            this.uw = this.$watch(() => inst.parent, () => {
                if (this.r) {
                    this.$nextTick(() => {
                        inst.setFromObject(inst.parent);
                        this.r = true;
                    });
                    this.r = false;
                }
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
