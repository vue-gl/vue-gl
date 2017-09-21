import VglLineSegments from "./vgl-line-segments.js";
import {AxisHelper} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglLineSegments],
    props: ["size"],
    computed: {
        inst() {
            return new AxisHelper(parseNumber(this.size));
        }
    }
};
