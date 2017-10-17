import VglCylinderGeometry from "./vgl-cylinder-geometry.js";
import {ConeGeometry} from "./three.js";
import {parseFloat_, parseInt_} from "./utils.js";

export default {
    mixins: [VglCylinderGeometry],
    props: {
        radius: [String, Number]
    },
    computed: {
        inst() {
            return new ConeGeometry(...[
                "radius",
                "height",
                "radialSegments",
                "heightSegments",
                "openEnded",
                "thetaStart",
                "thetaLength"
            ].map((key, i) => (i < 2 || i > 4 ? parseFloat_: parseInt_)(this[key])));
        }
    }
};
