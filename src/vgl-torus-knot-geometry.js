import VglGeometry from "./vgl-geometry.js";
import {TorusKnotGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "tube",
        "radialSegments",
        "tubularSegments",
        "p",
        "q"
    ],
    computed: {
        inst() {
            return new TorusKnotGeometry(
                parseNumber(this.radius),
                parseNumber(this.tube),
                parseNumber(this.tubularSegments, true),
                parseNumber(this.radialSegments, true),
                parseNumber(this.p),
                parseNumber(this.q)
            );
        }
    }
};
