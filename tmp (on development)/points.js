import object3d from "./object3d";
import {Points} from "three";

export default {
    mixins: [object3d],
    props: ["geometry", "material"],
    computed: {
        instance: () => new Points()
    },
    created() {
        if (this.material in this.assets.materials) {
            this.instance.material = this.assets.materials[this.material];
        }
        if (this.geometry in this.assets.geometries) {
            this.instance.geometry = this.assets.geometries[this.geometry];
        }
    },
    watch: {
        material(material) {
            this.instance.material = this.assets.materials[material];
        },
        geometry(geometry) {
            this.instance.geometry = this.assets.geometries[geometry];
        }
    }
};
