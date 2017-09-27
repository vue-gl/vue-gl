import VglGeometry from "./vgl-geometry.js";
import {RingGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "innerRadius",
        "outerRadius",
        "thetaSegments",
        "phiSegments",
        "thetaStart",
        "thetaLength"
    ],
    computed: {
        inst() {
            return new RingGeometry(
                parseNumber(this.innerRadius),
                parseNumber(this.outerRadius),
                parseNumber(this.thetaSegments, true),
                parseNumber(this.phiSegments, true),
                parseNumber(this.thetaStart),
                parseNumber(this.thetaLength)
            );
        }
    }
};
