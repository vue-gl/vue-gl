import VglLineSegments from "./vgl-line-segments.js";
import {BoxHelper} from "./three.js";
import {findParent} from "./utils.js";

export default {
    mixins: [VglLineSegments],
    props: {
        color: {
            type: String,
            default: "#ff0"
        }
    },
    data() {
        return {uw: null};
    },
    computed: {
        inst: () => new BoxHelper()
    },
    created() {
        this.inst.material.color.setStyle(this.color);
        const $parent = findParent(this, "isVglObject3d");
        if ($parent) {
            this.uw = this.$watch(() => $parent.inst, (inst) => {
                this.inst.setFromObject(inst);
            }, {immediate: true});
        }
    },
    beforeDestroy() {
        if (this.uw) this.uw();
    },
    watch: {
        color(color) {
            this.inst.material.color.setStyle(color);
        }
    }
};
