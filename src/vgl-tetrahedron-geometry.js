import VglGeometry from "./vgl-geometry.js";
import {TetrahedronGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "detail"
    ],
    computed: {
        inst() {
            return new TetrahedronGeometry(
                parseNumber(this.radius),
                parseNumber(this.detail, true)
            );
        }
    }
};
