import VglObject3d from "./vgl-object3d.js";
import {assetFactory} from "./mixins.js";
import {Scene} from "./three.js";

export default {
    mixins: [VglObject3d, assetFactory(Scene, "vglScenes")]
};
