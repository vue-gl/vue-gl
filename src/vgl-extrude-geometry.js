import VglGeometry from "./vgl-geometry.js";
import {ExtrudeGeometry} from "./three.js";

export default {
    mixins: [VglGeometry],
    computed: {
        inst() {
            return new ExtrudeGeometry([], {});
        }
    }
};
