import VglObject3d from "./vgl-object3d.js";
import {hasMaterial} from "./mixins.js";
import {Sprite} from "./three.js";

export default {
    mixins: [VglObject3d, hasMaterial],
    computed: {
        inst: () => new Sprite()
    }
};
