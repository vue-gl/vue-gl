import VglCylinderGeometry from "./vgl-cylinder-geometry.js";
import {ConeGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglCylinderGeometry],
    props: [
        "radius"
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
