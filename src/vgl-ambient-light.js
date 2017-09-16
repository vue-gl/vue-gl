import VglLight from "./vgl-light.js";
import {AmbientLight} from "./three.js";

export default {
    mixins: [VglLight],
    computed: {
        inst: () => new AmbientLight()
    }
};
