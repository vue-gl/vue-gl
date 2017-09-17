import VglAssets from "./vgl-assets.js";
import {Material} from "./three.js";

function getParentMaterials(vm) {
    return Object.getPrototypeOf(vm.assets.materials);
}

export default {
    mixins: [VglAssets],
    props: ["name"],
    computed: {
        inst: () => new Material()
    },
    watch: {
        inst(inst) {
            const materials = getParentMaterials(this);
            if (materials) materials[this.name] = inst;
        }
    },
    created() {
        const materials = getParentMaterials(this);
        if (materials) {
            this.$set(materials, this.name, this.inst);
        }
    },
    beforeDestroy() {
        const materials = getParentMaterials(this);
        if (materials && materials[this.name] === this.inst) {
            this.$delete(materials, this.name);
        }
    }
};
