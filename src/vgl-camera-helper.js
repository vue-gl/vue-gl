import VglLineSegments from "./vgl-line-segments.js";
import {CameraHelper, LineSegments} from "./three.js";
import {validatePropString} from "./utils.js";

export default {
    mixins: [VglLineSegments],
    props: {
        camera: validatePropString
    },
    inject: ["vglCameras"],
    computed: {
        inst() {
            const cmr = this.vglCameras.forGet[this.camera];
            return cmr ? new CameraHelper(cmr): new LineSegments();
        }
    }
};
