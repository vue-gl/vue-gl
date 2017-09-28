import VglGeometry from "./vgl-geometry.js";
import {TorusGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "tube",
        "radialSegments",
        "tubularSegments",
        "arc"
    ],
    computed: {
        inst() {
            return new TorusGeometry(
                parseNumber(this.radius),
                parseNumber(this.tube),
                parseNumber(this.radialSegments, true),
                parseNumber(this.tubularSegments, true),
                parseNumber(this.arc)
            );
        }
    }
};
