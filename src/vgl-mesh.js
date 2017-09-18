import VglObject3d from "./vgl-object3d.js";
import {Mesh} from "./three.js";

export default {
    mixins: [VglObject3d],
    props: ["geometry", "material"],
    computed: {
        inst: () => new Mesh(),
        geo() {
            const geometries = Object.getPrototypeOf(this.assets.geometries);
            if (geometries) return geometries[this.geometry];
        },
        mtl() {
            const materials = Object.getPrototypeOf(this.assets.materials);
            if (materials) return materials[this.material];
        }
    },
    created() {
        if (this.mtl) this.inst.material = this.mtl;
        if (this.geo) this.inst.geometry = this.geo;
    },
    watch: {
        mtl(mtl) {
            this.inst.material = mtl;
        },
        geo(geo) {
            this.inst.geometry = geo;
        }
    }
};
