import VglLineSegments from "./vgl-line-segments.js";
import {BoxHelper} from "./three.js";

export default {
    mixins: [VglLineSegments],
    props: ["color"],
    computed: {
        inst: () => new BoxHelper()
    },
    created() {
        const inst = this.inst;
        if (this.color) inst.material.color.setStyle(this.color);
        if (inst.parent) inst.setFromObject(inst.parent);
    },
    watch: {
        color(clr) {
            this.inst.material.color.setStyle(this.color);
        }
    }
};
