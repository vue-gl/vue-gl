import VglMaterial from "./vgl-material.js";
import {ShadowMaterial} from "./three.js";

export default {
    mixins: [VglMaterial],
    computed: {
        inst: () => new ShadowMaterial()
    }
};
