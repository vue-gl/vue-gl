import camera from "./camera";
import {PerspectiveCamera} from "three";

export default {
    mixins: [camera],
    props: ["zoom", "near", "far"],
    computed: {
        instance() {
            return new PerspectiveCamera();
        }
    },
    created() {
        this.instance.zoom = this.zoom || 1;
        this.instance.near = this.near || .1;
        this.instance.far = this.far || 2000;
    },
    watch: {
        zoom(zoom) {
            this.instance.zoom = zoom || 1;
        },
        near(near) {
            this.instance.near = near || .1;
        },
        far(far) {
            this.instance.far = far || 2000;
        }
    }
};
