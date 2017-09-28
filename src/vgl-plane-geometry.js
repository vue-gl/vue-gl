import VglGeometry from "./vgl-geometry.js";
import {PlaneGeometry} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglGeometry],
    props: [
        "width",
        "height",
        "widthSegments",
        "heightSegments"
    ],
    computed: {
        inst() {
            return new PlaneGeometry(
                parseNumber(this.width),
                parseNumber(this.height),
                parseNumber(this.widthSegments, true),
                parseNumber(this.heightSegments, true)
            );
        }
    }
};
