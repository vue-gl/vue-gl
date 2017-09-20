import VglGeometry from "./vgl-geometry.js";
import {BoxGeometry} from "./three.js";

function parseNumber(num) {
    return typeof num === "string" ? parseFloat(num): num;
}

export default {
    mixins: [VglGeometry],
    props: [
        "width",
        "height",
        "depth",
        "widthSegments",
        "heightSegments",
        "depthSegments"
    ],
    computed: {
        inst() {
            return new BoxGeometry(
                parseNumber(this.width),
                parseNumber(this.height),
                parseNumber(this.depth),
                parseNumber(this.widthSegments),
                parseNumber(this.heightSegments),
                parseNumber(this.depthSegments)
            );
        }
    }
};
