import VglGeometry from "./vgl-geometry.js";
import {ConeGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "height",
        "radialSegments",
        "heightSegments",
        "openEnded",
        "thetaStart",
        "thetaLength"
    ],
    computed: {
        inst() {
            return new ConeGeometry(
                parseNumber(this.radius),
                parseNumber(this.height),
                parseNumber(this.radialSegments),
                parseNumber(this.heightSegments),
                this.openEnded,
                parseNumber(this.thetaStart),
                parseNumber(this.thetaLength)
            );
        }
    }
};
