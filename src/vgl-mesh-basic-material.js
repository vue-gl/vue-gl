import VglMaterial from "./vgl-material.js";
import {MeshBasicMaterial} from "./three.js";
import {hasColorFactory, hasMap} from "./mixins.js";

export default {
    mixins: [VglMaterial, hasColorFactory("#fff"), hasMap],
    computed: {
        inst: () => new MeshBasicMaterial()
    }
};
