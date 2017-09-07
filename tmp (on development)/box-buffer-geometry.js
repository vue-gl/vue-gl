import bufferGeometry from "./buffer-geometry";
import {BoxBufferGeometry} from "three";

export default {
    mixins: [bufferGeometry],
    props: ["width", "height", "depth", "widthSegments", "heightSegments", "depthSegments"],
    computed: {
        instance() {
            return new BoxBufferGeometry(this.width, this.height, this.depth, this.widthSegments || 1, this.heightSegments || 1, this.depthSegments || 1);
        }
    }
};
