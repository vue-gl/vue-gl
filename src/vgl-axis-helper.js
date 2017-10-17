import VglLineSegments from "./vgl-line-segments.js";
import {AxisHelper} from "./three.js";
import {parseFloat_} from "./utils.js";

export default {
    mixins: [VglLineSegments],
    props: {size: [String, Number]},
    computed: {
        inst() {
            return new AxisHelper(parseFloat_(this.size));
        }
    }
};
