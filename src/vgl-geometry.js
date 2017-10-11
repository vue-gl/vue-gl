import {assetFactory} from "./mixins.js";
import {Geometry} from "./three.js";

export default {
    mixins: [assetFactory(Geometry, "vglGeometries")]
};
