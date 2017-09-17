import VglGeometry from "./vgl-geometry.js";
import {SphereGeometry} from "./three.js";

export default {
    mixins: [VglGeometry],
    props: [
        "radius",
        "widthSegments",
        "heightSegments",
        "phiStart",
        "phiLength",
        "thetaStart",
        "thetaLength"
    ],
    computed: {
        inst() {
            return new SphereGeometry(
                parseFloat(this.radius),
                parseFloat(this.widthSegments),
                parseFloat(this.heightSegments),
                parseFloat(this.phiStart),
                parseFloat(this.phiLength),
                parseFloat(this.thetaStart),
                parseFloat(this.thetaLength)
            );
        }
    }
};
