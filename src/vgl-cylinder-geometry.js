import VglGeometry from "./vgl-geometry.js";
import {CylinderGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radiusTop",
        "radiusBottom",
        "height",
        "radialSegments",
        "heightSegments",
        "openEnded",
        "thetaStart",
        "thetaLength"
    ],
    computed: {
        inst() {
            return new CylinderGeometry(
                parseNumber(this.radiusTop),
                parseNumber(this.radiusBottom),
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
