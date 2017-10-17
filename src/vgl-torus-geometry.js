import VglGeometry from "./vgl-geometry.js";
import {TorusGeometry} from "./three.js";
import {parseFloat_, parseInt_, createObjectFromArray} from "./utils.js";

const validator = [String, Number];

const props = [
    "radius",
    "tube",
    "radialSegments",
    "tubularSegments",
    "arc"
];

export default {
    mixins: [VglGeometry],
    props: createObjectFromArray(props, () => validator),
    computed: {
        inst() {
            return new TorusGeometry(...props.map((key, i) => (i < 2 || i > 3 ? parseFloat_: parseInt_)(this[key])));
        }
    }
};
