import VglGeometry from "./vgl-geometry.js";
import {DodecahedronGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "detail"
    ],
    computed: {
        inst() {
            return new DodecahedronGeometry(
                parseNumber(this.radius),
                parseNumber(this.detail, true)
            );
        }
    }
};
