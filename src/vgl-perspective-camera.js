import VglCamera from "./vgl-camera.js";
import {PerspectiveCamera} from "./three.js";

export default {
    mixins: [VglCamera],
    props: ["zoom", "near", "far"],
    computed: {
        inst() {
            return new PerspectiveCamera();
        }
    },
    created() {
        const inst = this.inst;
        if (this.zoom) inst.zoom = parseFloat(this.zoom);
        if (this.near) inst.near = parseFloat(this.near);
        if (this.far) inst.far = parseFloat(this.far);
    },
    watch: {
        zoom(zoom) {
            this.inst.zoom = parseFloat(zoom);
        },
        near(near) {
            this.inst.near = parseFloat(near);
        },
        far(far) {
            this.inst.far = parseFloat(far);
        }
    }
};
