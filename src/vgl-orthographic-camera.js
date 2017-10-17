import VglCamera from "./vgl-camera.js";
import {OrthographicCamera} from "./three.js";
import {parseFloat_} from "./utils.js";

const validator = [String, Number];

export default {
    mixins: [VglCamera],
    props: {
        zoom: {
            type: validator,
            default: 1
        },
        near: {
            type: validator,
            default: 0.1
        },
        far: {
            type: validator,
            default: 2000
        }
    },
    computed: {
        inst: () => new OrthographicCamera()
    },
    created() {
        const inst = this.inst;
        inst.zoom = parseFloat_(this.zoom);
        inst.near = parseFloat_(this.near);
        inst.far = parseFloat_(this.far);
    },
    watch: {
        zoom(zoom) {
            this.inst.zoom = parseFloat_(zoom);
        },
        near(near) {
            this.inst.near = parseFloat_(near);
        },
        far(far) {
            this.inst.far = parseFloat_(far);
        }
    }
};
