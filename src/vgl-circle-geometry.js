import VglGeometry from "./vgl-geometry.js";
import {CircleGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "segments",
        "thetaStart",
        "thetaLength"
    ],
    computed: {
        inst() {
            return new CircleGeometry(
                parseNumber(this.radius),
                parseNumber(this.segments),
                parseNumber(this.thetaStart),
                parseNumber(this.thetaLength)
            );
        }
    }
};
