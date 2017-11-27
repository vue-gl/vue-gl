import VglObject3d from "./vgl-object3d.js";
import {LensFlare} from "./three.js";

export default {
    isVglLensFlare: true,
    mixins: [VglObject3d],
    computed: {
        inst: () => new LensFlare()
    }
};
