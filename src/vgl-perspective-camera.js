import VglCamera from "./vgl-camera.js";
import {PerspectiveCamera} from "./three.js";
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
        },
        fov: {
            type: validator,
            default: 50
        }
    },
    computed: {
        inst: () => new PerspectiveCamera()
    },
    created() {
        const inst = this.inst;
        inst.zoom = parseFloat_(this.zoom);
        inst.near = parseFloat_(this.near);
        inst.far = parseFloat_(this.far);
        inst.fov = parseFloat_(this.fov);
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
        },
        fov(fov) {
            this.inst.fov = parseFloat_(fov);
        }
    }
};
