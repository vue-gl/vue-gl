import VglAssets from "./vgl-assets.js";
import {Geometry} from "./three.js";

function getParentGeometries(vm) {
    return Object.getPrototypeOf(vm.assets.geometries);
}

export default {
    mixins: [VglAssets],
    props: ["name"],
    computed: {
        inst: () => new Geometry()
    },
    watch: {
        inst(inst) {
            const geometries = getParentGeometries(this);
            if (geometries) geometries[this.name] = inst;
        }
    },
    created() {
        const geometries = getParentGeometries(this);
        if (geometries) {
            this.$set(geometries, this.name, this.inst);
        }
    },
    beforeDestroy() {
        const geometries = getParentGeometries(this);
        if (geometries && geometries[this.name] === this.inst) {
            this.$delete(geometries, this.name);
        }
    }
};
