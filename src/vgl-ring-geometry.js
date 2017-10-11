import VglGeometry from "./vgl-geometry.js";
import {RingGeometry} from "./three.js";
import {parseFloat_, parseInt_, createObjectFromArray} from "./utils.js";

const validator = [String, Number];

const props = [
    "innerRadius",
    "outerRadius",
    "thetaSegments",
    "phiSegments",
    "thetaStart",
    "thetaLength"
];

export default {
    mixins: [VglGeometry],
    props: createObjectFromArray(props, () => validator),
    computed: {
        inst() {
            return new RingGeometry(...props.map((key, i) => (i < 2 || i > 3 ? parseFloat_: parseInt_)(this[key])));
        }
    }
};
