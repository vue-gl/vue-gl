import object3d from "./object3d";
import {Mesh} from "three";

export default {
    mixins: [object3d],
    props: ["geometry", "material"],
    computed: {
        instance: () => new Mesh(),
        geometryInstance() {
            return this.assets.geometries[this.geometry];
        },
        materialInstance() {
            return this.assets.materials[this.material];
        }
    },
    created() {
        if (this.materialInstance) {
            this.instance.material = this.materialInstance;
        }
        if (this.geometryInstance) {
            this.instance.geometry = this.geometryInstance;
        }
    },
    watch: {
        materialInstance(material) {
            this.instance.material = material;
        },
        geometryInstance(geometry) {
            this.instance.geometry = geometry;
        }
    }
};
